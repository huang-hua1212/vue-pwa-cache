<template>
  <div class="container Likes-List">
    <div class="Likes">
      <div class="pos_1">
        <div class="above">
          <div class="above-title"><h>我按讚的貼文</h></div>
        </div>
        <div class="under"></div>
      </div>
      <div class="pos_2" v-for="post in posts" :key="post">
        <div class="like">
          <a type="button" class="likeDetails" href="#" @click.prevent="">
            <div
              class="likeHeadImg"
              :style="{ 'background-image': 'url(' + post.user.photo + ')' }"
              style="
                width: 3.5em;
                padding-top: 3.5em;
                background-size: cover;
                background-position: center;
                overflow: hidden;
              "
            ></div>
            <div class="likeName">
              <h3>{{ post.user.name }}</h3>
              <h5>發文時間: {{ post.updatedAt }}</h5>
            </div>
          </a>
          <div class="delete-and-seeDetails">
            <a type="button" class="thumbs-up-A" href="#" @click.prevent="">
              <font-awesome-icon
                class="thumbs-up-Icon"
                icon="thumbs-up"
                size="1x"
                :style="{ color: '#969799' }"
              />
              <div class="delBtn">取消</div>
            </a>
            <router-link class="arrow-right-A" :to="`/post/${post._id}`">
              <font-awesome-icon
                class="arrow-right-Icon"
                icon="circle-arrow-right"
                size="1x"
                :style="{ color: '#969799' }"
              />
              <div class="searchBtn">查看</div></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!--  PROGRESS BAR 1 --- Loading PAGE -->
    <div v-show="isLoading" class="loadingBackground"></div>
    <div v-show="isLoading" class="loading">
      <div class="lds-circle"><div></div></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      myUserId: '',
      myUserInformation: {},
      posts: [],
      isLoading: false,
    };
  },
  mounted() {
    this.userTokenCheck(this.getMyUserInformation);
  },
  methods: {
    userTokenCheck(next) {
      const url = `${process.env.VUE_APP_API}/user/auth-check`;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      const bearerToken = `Bearer ${token}`;
      axios.defaults.headers.common.Authorization = bearerToken;
      axios
        .post(url)
        .then((res) => {
          this.myUserId = res.data.userId;
          if (next !== undefined) {
            next();
          }
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    getMyUserInformation() {
      this.isLoading = true;

      const id = this.myUserId; // 主使用者
      const url = `${process.env.VUE_APP_API}/users/${id}`;

      axios
        .get(url)
        .then((res) => {
          const { _id, photo, likePosts } = res.data.datas;
          this.myUserInformation = { _id, photo, likePosts };
          this.posts = likePosts;
          setTimeout(() => {
            this.isLoading = false;
          }, 20);
        })
        .catch(() => {});
    },
    deleteLike() {},
    goToPost() {},
  },
};
</script>
<style lang="scss" scoped>
.Likes-List {
  margin-left: 0em;
  height: 42em;
  padding-bottom: 0;
  padding-bottom: 8em;
}
.Likes {
  margin: 0;
  margin-bottom: 1.5em;
  text-align: left;
  vertical-align: middle;
  padding-bottom: 1.5em;
}
.pos_1 {
  height: 5em;
  position: relative;
}
.under {
  position: absolute;
  height: 100%;
  width: 100%;
  right: 0.1em;
  top: 0.4em;
  background: white;
  border: black solid;
  z-index: 0;
}
.above {
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  border: black solid;
  z-index: 100;
  text-align: center;
  vertical-align: middle;
}
.above > .above-title {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 1.2em;
}
.pos_2 {
  border-radius: 0.5em;
  margin-top: 2em;
  padding-bottom: 0.5em;
  border: black solid;
  width: 100%;
  background: white;
  box-shadow: 0 0.2em 0em -0.005em black;
}
.likeDetails {
  display: flex;
  margin-left: 1em;
  margin-top: 0.8em;
  margin-bottom: 0.1em;
  color: black;
}
.like {
  display: flex;
  // margin-left: 1em;
  // margin-top: 0.8em;
  // margin-bottom: 0.1em;
  // color: black;
}
// .like {
//   display: flex;
//   margin-left: 1em;
//   margin-top: 0.8em;
//   margin-bottom: 0.1em;
//   color: black;
// }
.likeHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.likeName {
  padding-left: 1em;
  line-height: 0.6pt;
}
.delete-and-seeDetails {
  display: flex;
  margin-top: 0em;
  margin-left: auto;
  margin-right: 2em;
  vertical-align: middle;
  align-items: center;
  //   border: black solid;
}
.delete-and-seeDetails a {
  color: black;
}
.delBtn {
  font-size: 0.8em;
  font-weight: bold;
}
.thumbs-up-A {
  padding-right: 1.5em;
  margin-top: -0.1em;
}
.thumbs-up-Icon {
  margin-left: 0.4em;
}
.arrow-right-Icon {
  margin-left: 0.3em;
}
.searchBtn {
  font-size: 0.8em;
  font-weight: bold;
}
</style>
