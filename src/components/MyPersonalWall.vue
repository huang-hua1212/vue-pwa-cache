<template>
  <div class="container my-Personal-Wall">
    <div class="pos_1">
      <div class="above">
        <div
          class="userHeadImg"
          :style="{ 'background-image': 'url(' + userInformation.photo + ')' }"
          style="background-size: cover; background-position: center; overflow: hidden"
        ></div>
        <div class="name-Date">
          <h3>
            {{ userInformation.name }}
          </h3>
          <h5>100,000 人追蹤</h5>
        </div>
        <div class="follow-Btn">
          <a type="button" class="follow-A" href="#" @click.prevent="followOrCancelFollow()"
            ><div
              class="follow-Btn-div"
              :class="{ 'follow-Btn-div-cancel': isCancelFollowBtnActive }"
            >
              {{ isCancelFollowBtnActive ? '取消追蹤' : '追蹤' }}
            </div></a
          >
        </div>
      </div>
      <div class="under"></div>
    </div>
    <div class="pos_2">
      <div class="search-Div">
        <div class="search-DropDown">
          <select class="search-Select" v-model="sortBy" @change.prevent="sort()">
            <option value="newest">最新貼文</option>
            <option value="oldest">最舊貼文</option>
          </select>
        </div>
        <div class="search-Text">
          <input
            type="text"
            v-model="searchText"
            class="search-Text-Input"
            placeholder="搜尋貼文"
          />
          <a type="button" class="search-Btn" href="#" @click.prevent="searchByText()">
            <div class="search-Unicon"><unicon name="search" fill="white"></unicon></div
          ></a>
        </div>
      </div>
    </div>
    <!-- po 文 -->
    <div v-for="post in posts" :key="post" class="post">
      <div class="post_1">
        <a type="button" class="" href="#" @click.prevent="">
          <div
            class="postHeadImg"
            :style="{ 'background-image': 'url(' + post.user.photo + ')' }"
            style="background-size: cover; background-position: center; overflow: hidden"
          ></div
        ></a>
        <div class="posterName">
          <h3>{{ post.user.name }}</h3>
          <h5>{{ post.createdAt }}</h5>
        </div>
        <div class="post-edit-div">
          <a
            type="button"
            class="post-edit-A"
            href="#"
            @click.prevent="
              {
                post.isDropDown = !isDropDown;
              }
            "
            @blur="closeDropDown(post)"
          >
            <div class="post-edit-btn"><unicon name="ellipsis-h" fill="black"></unicon></div
          ></a>
          <transition name="fade" class="dropDown-List" v-if="post.isDropDown">
            <ul class="dropDonw-List-Ul">
              <a type="button" class="" href="#" @click.prevent="deletePost(post)">
                <li style="">刪除</li>
              </a>
              <a type="button" class="" href="#" @click.prevent="">
                <li style="">編輯</li>
              </a>
            </ul>
          </transition>
        </div>
      </div>
      <div class="post_2 content">
        <h4>{{ post.content }}</h4>
      </div>
      <div class="post_3">
        <img :src="post.image" />
      </div>
      <div class="post_4">
        <!-- 按讚 -->
        <a type="button" class="thumbs-up-A" href="#" @click.prevent="addLikeOrDeleteLike(post)">
          <unicon
            class="thumbs-up"
            name="thumbs-up"
            :fill="[post.isLikeClicked ? 'royalblue' : '#a6a6a6']"
          ></unicon>
        </a>
        <div>&nbsp;&nbsp;{{ post.likes }}</div>
      </div>
      <div class="post_5">
        <div class="post_1">
          <div
            class="postHeadImg"
            :style="{ 'background-image': 'url(' + myUserInformation.photo + ')' }"
            style="
              width: 3.5em;
              padding-top: 3.5em;
              background-size: cover;
              background-position: center;
              overflow: hidden;
            "
          ></div>
        </div>
        <div class="comment-form">
          <input
            type="text"
            class="comment-form-text"
            v-model="post.comment.text"
            placeholder="輸入留言..."
          />
          <a type="button" class="comment-form-A" href="#" @click.prevent="addComment(post)">
            <div class="comment-form-btn">
              <h4>留言</h4>
            </div>
          </a>
        </div>
      </div>
      <!-- 各篇留言 -->
      <div class="pos_6" v-for="comment in post.commentDetail" :key="comment">
        <div class="pos_6_HeadName">
          <a type="button" class="" href="#" @click.prevent="">
            <div
              class="postHeadImg"
              style="
                width: 3.5em;
                padding-top: 3.5em;
                background-size: cover;
                background-position: center;
                overflow: hidden;
              "
              :style="{ 'background-image': 'url(' + comment.user.photo + ')' }"
            ></div>
          </a>
          <div class="posterName">
            <h3>{{ comment.user.name }}</h3>
            <h5>{{ comment.updatedAt }}</h5>
          </div>
        </div>
        <div class="postComment">
          <h4>{{ comment.content }}</h4>
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
      followingId: '',
      isLoading: false,
      isCancelFollowBtnActive: false,
      myUserInformation: {},
      myUserId: '', // 主使用者
      posts: [],
      sortBy: 'newest',
      searchText: '',
      userId: '6277d49f5b11695971e06846',
      userInformation: {},
    };
  },
  mounted() {
    this.userTokenCheck(this.getMyUserInformation);
    // this.getMyUserInformation();
    this.getPosts();
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
    closeDropDown(post) {
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        post.isDropDown = false;
      }, 70);
    },
    follow() {
      this.isCancelFollowBtnActive = true;
      const myUserId = this.myUserInformation._id;
      const url = `${process.env.VUE_APP_API}/userFollowing/${myUserId}`;
      const data = {
        user: this.userId,
        whoFollow: myUserId,
      };
      // 更新collection following
      axios
        .post(url, data)
        .then((res) => {
          this.followingId = res.data.data;
          // 移動到最上面，增加使用者體驗
          // this.isCancelFollowBtnActive = true;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    cancelFollow() {
      this.isCancelFollowBtnActive = false;
      const myUserId = this.myUserInformation._id;
      const url = `${process.env.VUE_APP_API}/userFollowing/${myUserId}`;

      const data = {
        _id: this.followingId,
      };
      axios
        .patch(url, data)
        .then(() => {
          this.followingId = '';
          // 移動到最上面，增加使用者體驗
          // this.isCancelFollowBtnActive = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    followOrCancelFollow() {
      if (this.isCancelFollowBtnActive) {
        this.cancelFollow();
      } else {
        this.follow();
      }
    },
    getMyUserInformation() {
      const id = this.myUserId; // 主使用者
      // const id = '627b5e55b50ea7cd805ddcca'; // 測試使用者
      const url = `${process.env.VUE_APP_API}/users/${id}`;
      axios
        .get(url)
        .then((res) => {
          this.myUserInformation = res.data.datas;
          return this.getUserInformation();
        })
        .catch(() => {});
    },
    getUserInformation() {
      const { id } = this.$route.params;
      this.userId = id;
      const url = `${process.env.VUE_APP_API}/users/${this.userId}`;
      axios
        .get(url)
        .then((res) => {
          this.userInformation = res.data.datas;
          // 是否已追蹤
          const isFollow = this.myUserInformation.followings.filter(
            (following) => following.user._id === this.userInformation._id,
          );
          this.followingId = isFollow[0]._id;
          if (this.followingId === '') {
            this.isCancelFollowBtnActive = false;
          } else {
            this.isCancelFollowBtnActive = true;
          }
        })
        .catch(() => {});
    },
    // search
    getPosts() {
      this.isLoading = true;
      const { id } = this.$route.params;
      this.userId = id;
      const url = `${process.env.VUE_APP_API}/posts/by-userId/${this.userId}`;
      axios
        .get(url)
        .then((res) => {
          res.data.datas.forEach((post) => {
            // eslint-disable-next-line no-param-reassign
            post.createdAt_Original = post.createdAt;
            const [first] = post.createdAt.split('T');
            // eslint-disable-next-line no-param-reassign
            post.createdAt = first;
          });
          this.posts = res.data.datas;
          this.sort();
          this.posts.forEach(async (post) => {
            // eslint-disable-next-line no-param-reassign
            post.isLikeClicked = post.whoLikes.includes(this.myUserId);
            await post.commentDetail.forEach((comment) => {
              // eslint-disable-next-line no-param-reassign
              comment.updatedAt_Original = post.updatedAt;
              const [first] = comment.updatedAt.split('T');
              // eslint-disable-next-line no-param-reassign
              comment.updatedAt = first;
            });
            // eslint-disable-next-line no-param-reassign
            post.comment = { text: '' };
            // eslint-disable-next-line no-param-reassign
            post.isDropDown = false;
          });
          setTimeout(() => {
            this.isLoading = false;
          }, 1700);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    sort() {
      if (this.sortBy === 'newest') {
        this.posts.sort((a, b) => new Date(b.createdAt_Original) - new Date(a.createdAt_Original));
      } else if (this.sortBy === 'oldest') {
        this.posts.sort((a, b) => new Date(a.createdAt_Original) - new Date(b.createdAt_Original));
      }
    },
    searchByText() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/posts/by-userId/${this.userId}`;
      const data = {
        content: this.searchText,
      };
      axios
        .post(url, data)
        .then(async (res) => {
          res.data.datas.forEach((post) => {
            // eslint-disable-next-line no-param-reassign
            post.createdAt_Original = post.createdAt;
            const [first] = post.createdAt.split('T');
            // eslint-disable-next-line no-param-reassign
            post.createdAt = first;
          });
          this.posts = res.data.datas;
          this.sort();
          await this.posts.forEach(async (post) => {
            // eslint-disable-next-line no-param-reassign
            post.isLikeClicked = post.whoLikes.includes(this.myUserId);
            await post.commentDetail.forEach((comment) => {
              // eslint-disable-next-line no-param-reassign
              comment.updatedAt_Original = post.updatedAt;
              const [first] = comment.updatedAt.split('T');
              // eslint-disable-next-line no-param-reassign
              comment.updatedAt = first;
            });
            // eslint-disable-next-line no-param-reassign
            post.comment = { text: '' };
            // eslint-disable-next-line no-param-reassign
            post.isDropDown = false;
          });
          setTimeout(() => {
            this.isLoading = false;
          }, 20);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addLike(post_) {
      const post = post_;
      const userId = this.myUserId; // 主使用者
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/posts/${postId}`;
      const postReassign = post;
      postReassign.likes += 1;
      post.isLikeClicked = true;
      post.whoLikes.push(userId);
      const data = {
        likes: post.likes,
        whoLikes: post.whoLikes,
      };
      axios
        .patch(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike(post_) {
      const post = post_;
      const userId = this.myUserId; // 主使用者
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/posts/${postId}`;
      const postReassign = post;
      postReassign.likes -= 1;
      post.isLikeClicked = false;
      post.whoLikes = post.whoLikes.filter((whoLike) => whoLike !== userId);
      const data = {
        likes: post.likes,
        whoLikes: post.whoLikes,
      };
      axios
        .patch(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addLikeOrDeleteLike(post) {
      if (post.isLikeClicked) {
        this.deleteLike(post);
      } else {
        this.addLike(post);
      }
    },
    addComment(post) {
      const myUserId = this.myUserInformation._id;
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/postAddComment/${postId}`;
      const data = {
        user: myUserId,
        content: post.comment.text,
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log(res.data.data);
          this.addCommentNum(post);
          // eslint-disable-next-line no-param-reassign
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCommentNum(post_) {
      const post = post_;
      post.comments += 1;
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/posts/${postId}`;
      const data = {
        comments: post.comments,
      };
      axios
        .patch(url, data)
        .then(() => {
          console.log('addCommentNum Success!!!!');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePost(post) {
      this.isLoading = true;
      const id = post._id;
      const url = `${process.env.VUE_APP_API}/posts/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
// progress bar start
.loadingBackground {
  position: fixed;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  background: gray;
  opacity: 0.5;
}
.loading {
  position: fixed;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  margin-left: -50px; /* 100px/2 = 50px */
  margin-top: -50px; /* ditto */
  z-index: 201;
}
.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}
.lds-circle > div {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  background: #fff;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
@keyframes lds-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
// progress bar end
.my-Personal-Wall {
  margin-left: 0em;
  // height: 35.8em;
  height: 100%;
  // padding-right: 2%;
  padding-bottom: 0;
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
  border-radius: 0.5em;
  z-index: 0;
}
.above {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  background: white;
  border: black solid;
  border-radius: 0.5em;
  z-index: 100;
  text-align: center;
  vertical-align: middle;
}
.userHeadImg {
  width: 5em;
  height: 100%;
  border-radius: 0.5em 0 0 0.5em;
  border-right: black solid;
}
.name-Date {
  vertical-align: middle;
  text-align: center;
  margin-left: 1.2em;
}
.name-Date h3 {
  margin-bottom: 0em;
}
.name-Date h5 {
  margin-left: -1.5em;
  margin-top: 0em;
}
.follow-Btn {
  margin-left: auto;
  margin-right: 1em;
  vertical-align: middle;
  height: 100%;
}
.follow-Btn-div {
  font-size: 0.8em;
  font-weight: bold;
  height: 2em;
  font: normal normal bold 0.9em Noto Sans TC;
  vertical-align: middle;
  text-align: center;
  margin-top: 1.3em;
  padding-top: 0.6em;
  border-radius: 0.5em;
  border: black solid;
  padding-left: 2em;
  padding-right: 2em;
  box-shadow: 0px 2px 0px #000400;
  background: #eec32a;
  color: black;
}
.follow-Btn-div-cancel {
  font-size: 0.8em;
  font-weight: bold;
  height: 2em;
  font: normal normal bold 0.8em Noto Sans TC;
  vertical-align: middle;
  text-align: center;
  margin-top: 1.5em;
  padding-top: 0.6em;
  border-radius: 0.5em;
  border: black solid;
  padding-left: 2em;
  padding-right: 2em;
  box-shadow: 0px 2px 0px #000400;
  background: #efece7;
  color: black;
}
.pos_2 {
  margin-top: 2.5em;
}
// search start
.search-Div {
  display: flex;
  height: 2.5em;
  margin-bottom: 2em;
}
.search-DropDown {
  width: 35%;
  height: 100%;
}
.search-Select {
  width: 100%;
  height: 100%;
  font-size: 1em;
  // line-height: 1em;
  // padding-top: 0.3em;
  // padding-bottom: 0.3em;
  padding-left: 0.5em;
  border: black solid;
}
.search-Text {
  display: flex;
  margin-left: 2em;
  height: 88%;
  width: 100%;
}
.search-Text-Input {
  padding-left: 0.5em;
  height: 100%;
  width: 100%;
  padding: 0;
  padding-left: 0.5em;
  border: black solid;
  font-size: 1em;
}
.search-Btn {
  width: 10%;
  height: 100%;
  margin: 0;
  // margin: -0.02em;
  vertical-align: middle;
  text-align: center;
  background: #03438d;
  border-top: black solid;
  border-right: black solid;
  border-bottom: black solid;
}
.search-Unicon {
  margin-top: 0.3em;
}
// search end
.post {
  margin: 0;
  margin-bottom: 1.5em;
  text-align: left;
  vertical-align: middle;
  border: black solid;
  padding-left: 3%;
  // padding-right: 3.8%;
  padding-top: 1.6em;
  padding-bottom: 2em;
  background: white;
  border-radius: 1em;
}
.post_1 {
  height: auto;
  display: flex;
  align-items: center;
}
.postHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
  overflow: hidden;
}
.posterName {
  padding-left: 1em;
  line-height: 0.6pt;
}
.post-edit-div {
  // padding-top: -2em;
  // padding-left: 20em;
  margin-top: -2em;
  margin-left: auto;
  margin-right: 1.6em;
}
.content {
  padding-left: 0.3em;
}
.content h4 {
  white-space: pre;
  line-height: 2em;
}
.post_3 {
  width: 94%;
  height: auto;
  padding-bottom: 0;
  padding-left: 0.3em;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: black solid;
  border-radius: 8pt;
}
.post_4 {
  display: flex;
  width: 98.2%;
  height: auto;
  padding-bottom: 0;
  padding-left: 0.3em;
  margin-top: 1em;
  display: flex;
}
.thumbs-up-A {
  margin-top: -1.3em;
}
.post_5 {
  display: flex;
  padding-bottom: 0;
  padding-left: 0.3em;
  margin-top: 1em;
  vertical-align: middle;
  align-items: center;
  width: 93.5%;
}
.comment-form {
  display: flex;
  margin-left: 1em;
  // width: 35.5em;
  width: 100%;
  height: 2.25em;
}
.comment-form-text {
  height: 90%;
  width: 100%;
  // line-height: 100%;
  border: black solid;
  border-right: white;
}
.comment-form-A {
  // border: pink solid;
  height: 100%;
  width: 20%;
}
.comment-form-btn {
  line-height: 0%;
  height: 95.5%;
  width: 100%;
  background: #eec32a;
  vertical-align: middle;
  text-align: center;
  border: black solid;
  color: black;
}
.pos_6 {
  margin-left: 0.3em;
  width: 93.5%;
  // border: black solid;
  border-radius: 1.1em;
  background: #faf9f8;
  padding-bottom: 1.1em;
  // padding-left: 1.5em;
  padding-top: 1.5em;
  margin-top: 1em;
  vertical-align: middle;
  align-items: center;
}
.pos_6_HeadName {
  height: auto;
  display: flex;
  align-items: center;
  margin-left: 1.8em;
}
.postComment {
  padding-left: 6.5em;
}
.postComment > h4 {
  margin-top: 1.3em;
}
// dropDown
.dropDown-List {
  cursor: pointer;
  width: 6em;
  z-index: 100;
  background-color: #ffffff;
  border: black solid;
  position: absolute;
  margin-left: -4.5em;
  margin-top: 0em;
  text-align: center;
}
.dropDown-List {
  padding-inline-start: 0px;
}
.dropDown-List li {
  padding: 0.1em;
  list-style-type: none;
  margin-bottom: 13px;
  vertical-align: middle;
  line-height: 2em;
  margin: 0;
  color: black;
  font-family: 'Paytone One', sans-serif;
}

.dropDown-List li:hover {
  box-sizing: border-box;
  width: 100%;
  background: #efece7;
}
</style>
