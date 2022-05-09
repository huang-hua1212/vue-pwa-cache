<template>
  <div class="container createPosts">
    <div class="createPost">
      <div class="pos_1">
        <div class="above"><h3>張貼動態</h3></div>
        <div class="under"></div>
      </div>
      <div class="pos_2">
        <div class="createForm">
          <h4>貼文內容</h4>
          <textarea
            placeholder="輸入你的貼文內容"
            v-model="textContent"
            @keyup.prevent="isSendOutBtnActive"
          ></textarea>
          <div class="imgUpload-Div">
            <label for="fileUpload" class="imgUpload-A"
              ><span class="me-2">上傳圖片</span>
              <input
                id="fileUpload"
                type="file"
                ref="files"
                @change.prevent="uploadImage($event)"
              />
            </label>
          </div>
          <div v-show="imgs.length" class="imgDisplay">
            <img :src="this.imgs[0]" />
          </div>
          <div class="sendOutDiv">
            <!-- class="sendOutA" -->
            <a
              :class="{ 'sendOutA-Disable': !sendOutBtnActive }"
              type="button"
              href="#"
              @click.prevent="postNewPo()"
              ><div class="sendOutBtn" :class="{ 'sendOutBtn-Active': sendOutBtnActive }">
                送出貼文
              </div></a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- ProgressBar Loading -->
    <div v-show="isLoading" class="loadingBackground"></div>
    <div v-show="isLoading" class="loading">
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
  <!-- Progress bar -->
  <!-- <div style="position: relative">
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
  </div> -->
  <!-- <div class="loading"></div> -->
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      textContent: '',
      imgFile: {},
      imgs: [
        // 'https://images.unsplash.com/photo-1518805660775-eb21eab50e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      ],
      sendOutBtnActive: false,
      isLoading: false,
    };
  },
  components: {
    // Loading,
  },
  created() {},
  methods: {
    isSendOutBtnActive() {
      if (this.textContent && this.imgs.length > 0) {
        this.sendOutBtnActive = true;
      } else {
        this.sendOutBtnActive = false;
      }
    },
    postNewPo() {
      this.isLoading = true;
      const data = new FormData();
      data.append('user', '6277d49f5b11695971e06846');
      data.append('tags', '分享');
      data.append('type', 'person');
      data.append('image', this.imgFile);
      data.append('content', this.textContent);
      // console.log(data);
      // console.log(data.get('image'));
      // 'https://all-the-cors.herokuapp.com/http://blooming-sands-85089.herokuapp.com/posts'
      // http://blooming-sands-85089.herokuapp.com/posts
      // http://localhost:3000/posts
      axios
        .post('https://blooming-sands-85089.herokuapp.com/posts-with-FormDataImage', data)
        .then(() => {
          this.isLoading = false;
          this.$router.push('/posts');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    uploadImage(e) {
      const fileObject = e.target.files[0];
      this.imgFile = fileObject;
      const url = URL.createObjectURL(fileObject);
      this.imgs = [];
      this.imgs.push(url);
      this.isSendOutBtnActive();
    },
  },
};
</script>
<style lang="scss" scoped>
// loading Circle start
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
.lds-spinner {
  color: official;
  // display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: black;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
// loading Circle end
.createPosts {
  margin-left: 0em;
  padding-right: 2%;
  padding-bottom: 8em;
}
.createPost {
  margin: 0;
  margin-bottom: 1.5em;
  text-align: left;
  vertical-align: middle;
  padding-bottom: 1.5em;
}
.pos_1 {
  height: 4em;
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
.pos_2 {
  margin-top: 2em;
  background: white;
  border: black solid;
  border-radius: 0.3em;
  padding-top: 1em;
  padding-bottom: 2.5em;
  padding-left: 6%;
}
.createForm {
  width: 90%;
}
.createForm > h4 {
  margin-bottom: 0.3em;
}
.createForm > textarea {
  width: 100%;
  height: 12em;
  resize: none;
}
a {
  text-decoration: none;
}
// .uploadImg-Btn {
//   width: 8em;
//   background: black;
//   color: white;
//   vertical-align: middle;
//   text-align: center;
//   line-height: 2.2em;
//   border-radius: 0.3em;
// }
.imgUpload-Div {
  margin-top: 1.4em;
  margin-bottom: 1.6em;
}
.imgUpload-Div label {
  cursor: pointer;
}
.imgUpload-A {
  background: black;
  color: white;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 2em;
  padding-right: 2em;
  border-radius: 0.3em;
}
.imgUpload-A input {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  opacity: 0;
}
.imgDisplay {
  width: 100%;
  height: auto;
  padding-bottom: 0;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border: black solid;
  border-radius: 8pt;
}
.sendOutDiv {
  width: 60%;
  margin-left: 20%;
  margin-top: 6%;
}
.sendOutA-Disable {
  pointer-events: none;
}
.sendOutBtn {
  width: 100%;
  border: black solid;
  border-radius: 0.3em;
  vertical-align: middle;
  text-align: center;
  line-height: 2.3em;
  background: #a8b0b9;
  color: black;
  font-weight: bold;
  // box-shadow: -0.18em 0.18em 0em -0.005em black;
}
.sendOutBtn-Active {
  background: #eec32a;
  box-shadow: -0.18em 0.18em 0em -0.005em black;
}
</style>
