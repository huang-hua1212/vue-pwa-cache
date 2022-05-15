<template>
  <div class="container posts">
    <!-- 每一篇Po文 -->
    <div v-for="post in posts" :key="post" class="post">
      <div class="pos_1">
        <div class="postHeadImg"></div>
        <div class="posterName">
          <h3>{{ post.user.name }}</h3>
          <h5>{{ post.createdAt }}</h5>
        </div>
      </div>
      <div class="pos_2 content">
        <h4>{{ post.content }}</h4>
      </div>
      <div class="pos_3">
        <img :src="post.image" />
      </div>
    </div>
    <div class="post">
      <div class="pos_1">
        <div class="postHeadImg"></div>
        <div class="posterName">
          <h3>名稱</h3>
          <h5>日期</h5>
        </div>
      </div>
      <div class="pos_2 content">
        <h4>{{ this.content }}</h4>
      </div>
      <div class="pos_3">
        <img :src="this.imgs[0]" />
      </div>
    </div>
    <!-- PROGRESS BAR -->
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
      const url = 'http://blooming-sands-85089.herokuapp.com/posts';
      axios
        .get(url)
        .then((res) => {
          res.data.datas.forEach((post) => {
            const [first] = post.createdAt.split('T');
            // eslint-disable-next-line no-param-reassign
            post.createdAt = first;
          });
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
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
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
  0%, 100% {
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
  padding-bottom: 8em;
}
.pos_1 {
  height: auto;
  display: flex;
  align-items: center;
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
  padding-bottom: 1.5em;
  background: white;
  border-radius: 1em;
}
.postHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.posterName {
  padding-left: 1em;
  line-height: 0.6pt;
  font-family: 'Paytone One', sans-serif;
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
  // padding-right: 0.3em;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: black solid;
  border-radius: 8pt;
  // margin-right: 0.3em;
}
</style>
