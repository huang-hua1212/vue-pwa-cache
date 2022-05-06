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
          <!-- <a type="button" class="uploadImg" href="#" @click.prevent="">
            <div class="uploadImg-Btn"><h4>上傳圖片</h4></div>
            </a> -->
          <div class="imgDisplay">
            <img :src="this.imgs[0]" />
          </div>
          <div class="sendOutDiv">
            <a class="sendOutA" type="button" href="#" @click.prevent=""
              ><div class="sendOutBtn" :class="{ 'sendOutBtn-Active': sendOutBtnActive }">
                送出貼文
              </div></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textContent: '',
      imgs: [
        'https://images.unsplash.com/photo-1518805660775-eb21eab50e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      ],
      sendOutBtnActive: false,
    };
  },
  created() {},
  methods: {
    isSendOutBtnActive() {
      if (!this.textContent || !this.imgs) {
        this.sendOutBtnActive = false;
      } else {
        this.sendOutBtnActive = true;
      }
    },
    uploadImage(e) {
      const fileObject = e.target.files[0];
      const url = URL.createObjectURL(fileObject);
      console.log(url);
      this.imgs = [];
      this.imgs.push(url);
    },
  },
};
</script>
<style lang="scss" scoped>
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
