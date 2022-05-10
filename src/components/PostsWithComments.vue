<template>
  <div class="container posts">
    <div v-for="post in posts" :key="post" class="post">
      <div class="pos_1">
        <a type="button" class="" href="#" @click.prevent="">
          <div
            class="postHeadImg"
            style="
              background: url('https://images.unsplash.com/profile-1565658044215-2269917ff124?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff');
            "
          ></div
        ></a>
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
        <div class="pos_1">
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
            const [first] = post.createAt.split('T');
            // eslint-disable-next-line no-param-reassign
            post.createAt = first;
          });
          // console.log(res.data.datas);
          this.posts = res.data.datas;
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        })
        .catch((err) => {
          console.dir(err);
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
.posts {
  // margin-left: 0.5em;
  margin-right: 0.5em;
  // padding-left: 2%;
  padding-right: 2%;
}
.post {
  margin: 0;
  margin-bottom: 1.5em;
  text-align: left;
  vertical-align: middle;
  border: black solid;
  padding-left: 3%;
  padding-right: 3.8%;
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
  width: 98.2%;
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
}
.comment-form {
  display: flex;
  margin-left: 1em;
  width: 35.5em;
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
  border-radius: 1.1em;
  background: #faf9f8;
  padding-bottom: 1.1em;
  padding-left: 1.5em;
  padding-top: 1.5em;
  margin-top: 1em;
  vertical-align: middle;
  align-items: center;
}
.postComment {
  padding-left: 4.8em;
}
.postComment > h4 {
  margin-top: 1.3em;
}
</style>
