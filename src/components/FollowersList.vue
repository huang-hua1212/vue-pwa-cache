<template>
  <div class="container followers-List">
    <div class="followers">
      <div class="pos_1">
        <div class="above">
          <div class="above-title"><h>追蹤名單</h></div>
        </div>
        <div class="under"></div>
      </div>
      <div class="pos_2" v-for="following in userProfile.followings" :key="following">
        <div class="follower">
          <a type="button" class="uploadImg" href="#" @click.prevent="">
            <div
              class="followerHeadImg"
              :style="{ 'background-image': 'url(' + following.user.photo + ')' }"
              style="
                width: 3.5em;
                padding-top: 3.5em;
                background-size: cover;
                background-position: center;
                overflow: hidden;
              "
            ></div>
          </a>
          <div class="followerName">
            <h3>{{following.user.name}}</h3>
            <h5>追蹤時間: {{ following.createdAt }}</h5>
          </div>
          <h5 class="followDays">您已追蹤 {{following.diffDays}} 天</h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      userProfile: {},
    };
  },
  created() {
    this.getUserInformation();
  },
  methods: {
    getNumberOfDays(start, end) {
      const date1 = new Date(start);
      const date2 = new Date(end);
      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = date2.getTime() - date1.getTime();
      const diffInDays = Math.round(diffInTime / oneDay);

      return diffInDays;
    },
    getUserInformation() {
      const id = '6277d49f5b11695971e06846'; // 主使用者
      // const id = '627a2742b2af092f54100b44'; // 客使用者
      const url = `https://blooming-sands-85089.herokuapp.com/user/${id}`;

      axios
        .get(url)
        .then((res) => {
          res.data.datas.followings.forEach((following) => {
            // eslint-disable-next-line no-param-reassign
            following.createdAt_Original = following.createdAt;
            // eslint-disable-next-line no-param-reassign
            following.diffDays = this.getNumberOfDays(following.createdAt, Date.now()) + 1;
            const [first] = following.createdAt.split('T');
            // eslint-disable-next-line no-param-reassign
            following.createdAt = first;
          });
          const userProfile = res.data.datas;
          this.userProfile = userProfile;
          console.log(this.userProfile);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.followers-List {
  margin-left: 0em;
  // height: 38em;
  height: 50em;
  padding-bottom: 0;
}
.followers {
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
  border: black solid;
  width: 100%;
  background: white;
  box-shadow: 0 0.2em 0em -0.005em black;
}
.follower {
  display: flex;
  margin-left: 1em;
  margin-top: 0.8em;
  margin-bottom: 0.1em;
  color: black;
}
.followerHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.followerName {
  padding-left: 1em;
  line-height: 0.6pt;
}
.followDays {
  margin-left: auto;
  margin-right: 2em;
  margin-top: 2.5em;
  // padding-bottom: 0.5em;
}
</style>
