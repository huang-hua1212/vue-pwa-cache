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
            <div class="search-Unicon"><unicon name="search" fill="white"></unicon></div
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
            <h5>{{ post.createAt }}</h5>
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
          <a type="button" class="thumbs-up-A" href="#" @click.prevent="">
            <font-awesome-icon icon="thumbs-up" size="1.5x" :style="{ color: '#969799' }" />
          </a>
        </div>
        <div class="pos_5">
          <div class="pos_1">
            <div class="postHeadImg" style="width: 3.5em; padding-top: 3.5em"></div>
          </div>
          <div class="comment-form">
            <input type="text" class="comment-form-text" placeholder="輸入留言..." />
            <a type="button" class="comment-form-A" href="#" @click.prevent="">
              <div class="comment-form-btn">
                <h4>留言</h4>
              </div>
            </a>
          </div>
        </div>
        <!-- 各篇留言 -->
        <div class="pos_6">
          <div class="pos_6_HeadName">
            <a type="button" class="" href="#" @click.prevent="">
              <div
                class="postHeadImg"
                style="
                  background: url('https://images.unsplash.com/profile-1565658044215-2269917ff124?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff');
                  width: 3.5em;
                  padding-top: 3.5em;
                "
              ></div>
            </a>
            <div class="posterName">
              <h3>名稱</h3>
              <h5>2022/05/01</h5>
            </div>
          </div>
          <div class="postComment">
            <h4>真的~我已經準備長眠了</h4>
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
      posts: [],
      content: '外面看起來就超冷!\n我決定回被窩裡繼續睡',
      imgs: [
        'https://images.unsplash.com/photo-1518805660775-eb21eab50e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      ],
      isLoading: false,
      searchText: '',
      sortBy: 'newest',
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.isLoading = true;
      const url = 'https://blooming-sands-85089.herokuapp.com/posts';
      axios
        .get(url)
        .then((res) => {
          res.data.datas.forEach((post) => {
            // eslint-disable-next-line no-param-reassign
            post.createAt_Original = post.createAt;
            const [first] = post.createAt.split('T');
            // eslint-disable-next-line no-param-reassign
            post.createAt = first;
          });
          this.posts = res.data.datas;
          this.sort();
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    sort() {
      if (this.sortBy === 'newest') {
        this.posts.sort((a, b) => new Date(b.createAt_Original) - new Date(a.createAt_Original));
      } else if (this.sortBy === 'oldest') {
        this.posts.sort((a, b) => new Date(a.createAt_Original) - new Date(b.createAt_Original));
      }
      console.log(this.posts);
    },
    searchByText() {
      const data = {
        content: this.searchText,
      };
      const url = 'https://blooming-sands-85089.herokuapp.com/posts-by-content';
      // const url = 'http://localhost:3000/posts-by-content';
      axios
        .post(url, data)
        .then((res) => {
          this.posts = res.data.datas;
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
// .posts {
//   margin-left: 0em;
//   width: 60%;
// }
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
  // border-left: black solid;
}
.search-Unicon {
  // margin-left: 0.5em;
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
  width: 98.2%;
  height: auto;
  padding-bottom: 0;
  padding-left: 0.3em;
  margin-top: 1em;
}
.pos_4 {
  display: flex;
}
.pos_5 {
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
  width: 94%;
  border: black solid;
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
</style>
