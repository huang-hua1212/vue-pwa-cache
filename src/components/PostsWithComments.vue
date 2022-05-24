<template>
  <div class="container posts">
    <div class="post-Div">
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
            <div class="search-Unicon"><unicon name="search" :fill="['white']"></unicon></div
          ></a>
        </div>
      </div>
      <div v-for="post in posts" :key="post" class="post">
        <div class="pos_1">
          <router-link class="" :to="`/personal-wall/${post.user._id}`">
            <div
              class="postHeadImg"
              :style="{ 'background-image': 'url(' + post.user.photo + ')' }"
              style="background-size: cover; background-position: center; overflow: hidden"
            ></div
          ></router-link>
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
              <div class="post-edit-btn"><unicon name="ellipsis-h" :fill="['black']"></unicon></div
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
        <div class="pos_2 content">
          <h4>{{ post.content }}</h4>
        </div>
        <div class="pos_3">
          <img :src="post.image" />
        </div>
        <div class="pos_4">
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
        <div class="pos_5">
          <div class="pos_1">
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
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      comment: {
        text: '',
      },
      imgs: [
        'https://images.unsplash.com/photo-1518805660775-eb21eab50e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      ],
      searchText: '',
      sortBy: 'newest',
      // isLikeClicked: false,
      isLoading: false,
      myUserInformation: {},
      myUserId: '', // 主使用者
      posts: [],
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
      }, 100);
    },
    getMyUserInformation() {
      const id = this.myUserId; // 主使用者
      // const id = '627b5e55b50ea7cd805ddcca'; // 測試使用者
      const url = `${process.env.VUE_APP_API}/users/${id}`;
      axios
        .get(url)
        .then((res) => {
          const { _id, photo, likePosts } = res.data.datas;
          this.myUserInformation = { _id, photo, likePosts };
          // return this.getUserInformation();
        })
        .catch(() => {});
    },
    getPosts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/posts`;
      axios
        .get(url)
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
      const data = {
        content: this.searchText,
      };
      const url = 'https://blooming-sands-85089.herokuapp.com/posts/by-content';
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
    addUserLikePost(post_) {
      const post = post_;
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/users/${this.myUserId}`;
      this.myUserInformation.likePosts.push(postId);
      const data = {
        likePosts: this.myUserInformation.likePosts,
      };
      console.log(data);
      axios
        .patch(url, data)
        .then((res) => {
          console.log(res);
          this.getMyUserInformation();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addLike(post_) {
      this.addUserLikePost(post_);
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
    deleteUserLikePost(post_) {
      const post = post_;
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/users/${this.myUserId}`;
      this.myUserInformation.likePosts = this.myUserInformation.likePosts.filter(
        (likePost) => likePost !== postId,
      );
      const data = {
        likePosts: this.myUserInformation.likePosts,
      };
      axios
        .patch(url, data)
        .then((res) => {
          console.log(res);
          this.getMyUserInformation();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike(post_) {
      this.deleteUserLikePost(post_);
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
      this.isLoading = true;
      const myUserId = this.myUserInformation._id;
      const postId = post._id;
      const url = `${process.env.VUE_APP_API}/postAddComment/${postId}`;
      const data = {
        user: myUserId,
        content: post.comment.text,
      };
      axios
        .post(url, data)
        .then(() => {
          this.addCommentNum(post);
          // eslint-disable-next-line no-param-reassign
          this.getPosts();
          this.isLoading = false;
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
      console.log('觸發刪除!!!!');
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
.pos_1 {
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
.pos_3 {
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
.pos_4 {
  display: flex;
  width: 98.2%;
  height: auto;
  padding-bottom: 0;
  padding-left: 0.3em;
  margin-top: 1em;
}
.thumbs-up-A {
  margin-top: -1.3em;
}
.pos_5 {
  display: flex;
  padding-bottom: 0;
  padding-left: 0.3em;
  margin-top: 0.5em;
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
  //   border-radius: 0.5em;
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
