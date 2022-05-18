<template>
  <div class="container modifyPersonalProfiles">
    <div class="modifyPersonalProfile">
      <div class="pos_1">
        <div class="above">
          <div class="above-title"><h>修改個人資料</h></div>
        </div>
        <div class="under"></div>
      </div>
      <div class="pos_2">
        <div class="modifyArea">
          <ul class="tab-list">
            <li class="tab-itom">
              <input type="radio" id="tabRadio1" class="test-radio" name="tab" checked="checked" />
              <label class="test-label" for="tabRadio1">暱稱修改</label>
              <div class="tab-box">
                <div class="content">
                  <div
                    class="headImg"
                    :style="{ 'background-image': 'url(' + this.imgs[0] + ')' }"
                    style="background-size: cover; background-position: center; overflow: hidden"
                  ></div>
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
                  <div class="nickName-Form">
                    <label class="nickName-Form-Label">暱稱</label><br />
                    <input
                      type="text"
                      class="nickName-form-text"
                      @keyup.prevent="firstTabIsSendOutBtnActive()"
                      placeholder="輸入暱稱..."
                      v-model="nickName"
                    />
                  </div>
                  <div class="sexForm">
                    <label class="sexLabel">性別</label><br />
                    <div class="sexRadio">
                      <input
                        id="manRadio"
                        type="radio"
                        name="sexRadio"
                        value="男性"
                        v-model="sex"
                        :change="firstTabIsSendOutBtnActive()"
                      />
                      <label for="manRadio" class="sexRadioLabel">男性</label>
                      <input
                        id="womanRadio"
                        class="womanRadioInput"
                        type="radio"
                        name="sexRadio"
                        value="女性"
                        v-model="sex"
                        :change="firstTabIsSendOutBtnActive()"
                      />
                      <label for="womanRadio" class="sexRadioLabel">女性</label>
                    </div>
                  </div>
                  <a
                    type="button"
                    :class="{ 'sendOutA-Disable': !isFirstTab_SendOutBtnActive }"
                    class="send-A"
                    href="#"
                    @click.prevent="firstTabUpdateUserInformation()"
                    ><div
                      class="sendBtn"
                      :class="{ 'sendBtn-Active': isFirstTab_SendOutBtnActive }"
                    >
                      送出更新
                    </div>
                  </a>
                </div>
              </div>
            </li>
            <li class="tab-itom">
              <input type="radio" id="tabRadio2" class="test-radio" name="tab" />
              <label class="test-label" for="tabRadio2">重設密碼</label>
              <div class="tab-box">
                <div class="content">
                  <div class="password1-Form">
                    <label class="password1-Form-Label" for="password1">輸入新密碼</label><br />
                    <input
                      type="password"
                      id="password1"
                      v-model="firstPassword"
                      class="password1-form-text"
                      placeholder="輸入新密碼..."
                      @keyup.prevent="secondTabIsSendOutBtnActive()"
                    />
                  </div>
                  <div class="password2-Form">
                    <label class="password2-Form-Label" for="password2">再次輸入密碼</label><br />
                    <input
                      type="password"
                      id="password2"
                      v-model="secondPassword"
                      class="password2-form-text"
                      placeholder="再次輸入密碼..."
                      @keyup.prevent="secondTabIsSendOutBtnActive()"
                    />
                  </div>
                  <a
                    type="button"
                    class="secondTab-SendOutBtn"
                    :class="{ 'sendOutA-Disable': !isSecondTab_SendOutBtnActive }"
                    href="#"
                    @click.prevent="secondTabUpdateUserInformation()"
                    ><div
                      class="passwordBtn"
                      :class="{ 'secondTab-SendOutBtn-Active': isSecondTab_SendOutBtnActive }"
                    >
                      重設密碼
                    </div></a
                  >
                </div>
              </div>
            </li>
          </ul>
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
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      imgFile: {},
      imgs: [
        'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        // 'https://images.unsplash.com/photo-1603384698993-e5865da085c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1507&q=80',
      ],
      nickName: '',
      isFirstTab_SendOutBtnActive: false,
      sex: '',
      // password
      isSecondTab_SendOutBtnActive: false,
      firstPassword: '',
      secondPassword: '',
      isLoading: false,
      myUserId: '',
    };
  },
  created() {
    this.userTokenCheck(this.getUserInformation);
    // this.getUserInformation();
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
    getUserInformation() {
      this.isLoading = true;
      const id = this.myUserId; // 主使用者
      // const id = '627a2742b2af092f54100b44'; // 客使用者
      // const id = '627b5e55b50ea7cd805ddcca'; // 客使用者
      const url = `${process.env.VUE_APP_API}/user/${id}`;

      axios
        .get(url)
        .then((res) => {
          const userProfile = res.data.datas;
          this.imgs = [];
          this.imgs.push(userProfile.photo);
          this.nickName = userProfile.name;
          this.sex = userProfile.sex;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 第一個Tab
    firstTabIsSendOutBtnActive() {
      if (this.nickName && this.imgs.length > 0 && this.sex) {
        this.isFirstTab_SendOutBtnActive = true;
      } else {
        this.isFirstTab_SendOutBtnActive = false;
      }
    },
    firstTabUpdateUserInformation_ByUrlImage() {
      this.isLoading = true;
      const id = this.myUserId;
      // const id = '6277d49f5b11695971e06846'; // 主使用者
      //  const id = '627a2742b2af092f54100b44'; // 客使用者
      const url = `${process.env.VUE_APP_API}/user/${id}`;
      const data = {
        name: this.nickName,
        photo: this.imgs[0],
        sex: this.sex,
      };
      axios
        .patch(url, data)
        .then(() => {
          this.$emit('changeUserProfile', true);
          this.$router.push('/posts-with-comments');
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    firstTabUpdateUserInformation_ByFormDataImage() {
      this.isLoading = true;
      const id = this.myUserId;
      // const id = '6277d49f5b11695971e06846';  // 主使用者
      // const id = '627a2742b2af092f54100b44'; // 客使用者
      // const id = '627b5e55b50ea7cd805ddcca'; // 客使用者
      const url = `${process.env.VUE_APP_API}/user-with-FormDataImage/${id}`;
      const data = new FormData();
      data.append('name', this.nickName);
      data.append('photo', this.imgFile);
      data.append('sex', this.sex);

      axios
        .patch(url, data)
        .then(() => {
          this.$router.push('/posts-with-comments');
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadImage(e) {
      const fileObject = e.target.files[0];
      const url = URL.createObjectURL(fileObject);
      this.imgFile = fileObject;
      this.imgs = [];
      this.imgs.push(url);
      this.firstTabIsSendOutBtnActive();
    },
    firstTabUpdateUserInformation() {
      if (this.imgFile.name === undefined) {
        // console.log('url');
        this.firstTabUpdateUserInformation_ByUrlImage();
      } else {
        // console.log('formdata');
        this.firstTabUpdateUserInformation_ByFormDataImage();
      }
    },
    // 第二個Tab
    secondTabIsSendOutBtnActive() {
      if (this.firstPassword === this.secondPassword) {
        this.isSecondTab_SendOutBtnActive = true;
      } else {
        this.isSecondTab_SendOutBtnActive = false;
      }
    },
    secondTabUpdateUserInformation() {
      this.isLoading = true;

      const id = this.myUserId;
      // const id = '6277d49f5b11695971e06846'; // 主使用者
      const url = `${process.env.VUE_APP_API}/user/${id}`;
      const data = {
        password: this.secondPassword,
      };

      axios
        .patch(url, data)
        .then(() => {
          this.$router.push('/posts-with-comments');
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
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
.modifyPersonalProfile {
  margin-left: 0em;
  padding-right: 2%;
  height: 50em;
}
.modifyPersonalProfile {
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
// tabs
.pos_2 {
  margin-top: 2.2em;
}
ul {
  margin: 0;
  padding: 0;
}
.modifyArea {
  zoom: 1;
}
.modifyArea::after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}

.tab-list {
  position: relative;
}

.tab-list .tab-itom {
  float: left;
  list-style: none;
  //   margin-right: 4px;
  margin-left: 0.5em;
}

.tab-itom .test-label {
  position: relative;
  display: block;
  width: 6em;
  height: 2em;
  border: black solid;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  line-height: 2em;
  text-align: center;
  background: #ffffff;
  //   background: #e7e8eb;
}

.tab-itom .tab-box {
  /* 設定絕對定位方便定位相對於tab-list欄的位置，同時為了可以使用z-index屬性 */
  position: absolute;
  left: 0;
  top: 2.15em;
  width: 100%;
  padding-bottom: 4em;
  height: auto; // tab content高度
  border: black solid; // 1px solid #cbcccc;
  border-radius: 0.5em;
  border-top-left-radius: 0px;
  background: #fff;
  /* 設定層級最低方便選中狀態遮擋 */
  z-index: 0;
  //   shadow
  box-shadow: 0 0.2em 0em -0.005em black;
}
/* 用絕對定位使按鈕脫離文件流，透明度設定為0將其隱藏 */
input[type='radio'] {
  position: absolute;
  opacity: 0;
}
/* 利用選擇器實現  tab切換 */

/* 當radio為選中狀態時設定它的test-label兄弟元素的屬性 */
input[type='radio']:checked + .test-label {
  /* 為了修飾存在的邊框背景屬性 */
  border-color: black;
  //   border-bottom-color: #fff;
  color: white;
  background: black;
  /* 為了修飾存在的層級使下邊框遮擋下方div的上邊框 */
  z-index: 10;
}
/* 當radio為選中狀態時設定與它同級的tab-box元素的顯示層級 */
input[type='radio']:checked ~ .tab-box {
  /* 選中時提升層級，遮擋其他tab頁達到選中切換的效果 */
  z-index: 5;
}
input[type='radio']:not(:checked) ~ .tab-box {
  /* 選中時提升層級，遮擋其他tab頁達到選中切換的效果 */
  display: none;
}
.content {
  width: 100%;
  height: auto;
  margin-top: 2.5em;
  vertical-align: middle;
  text-align: center;
}
.content .headImg {
  position: relative;
  border-radius: 50%;
  width: 10em;
  //   height: auto;
  padding-top: 10em;
  background: white;
  border: black solid;
  margin: auto;
}
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
  // border-radius: 0.3em;
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
.nickName-Form,
.password1-Form,
.password2-Form {
  margin-left: 20%;
  margin-top: 1.5em;
  width: 60%;
}
.nickName-Form-Label,
.password1-Form-Label,
.password2-Form-Label {
  float: left;
  font-weight: bold;
  margin-left: 0;
  margin-bottom: 0.3em;
  font-size: 1em;
}
.nickName-form-text,
.password1-form-text,
.password2-form-text {
  width: 98%;
  line-height: 1.5em;
  font-size: 1em;
  border: black solid;
}
.sexForm {
  margin-left: 20%;
  margin-top: 2em;
  width: 60%;
}
.sexLabel {
  float: left;
  font-weight: bold;
  margin-left: 0;
  margin-bottom: 0.3em;
  font-size: 1em;
}
.sexRadio {
  margin-left: 0;
  margin-top: 0.8em;
  display: flex;
}
.sexRadio .sexRadioLabel {
  position: relative;
  float: left;
  clear: left;
  display: block;
  padding-left: 1.2em;
  padding-right: 1.2em;
  margin-bottom: 1em;
  line-height: 1em;
  font-size: 1em;
  color: rgb(0, 0, 0);
  cursor: pointer;
}
.sexRadioLabel:before {
  background: #fff;
  content: '';
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0.8em;
  height: 0.8em;
  border: 0.05em solid rgb(0, 0, 0);

  border-radius: 100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;

  box-shadow: inset 0 0 3px 0 #ccc;
  -moz-box-shadow: inset 0 0 3px 0 #ccc;
  -webkit-box-shadow: inset 0 0 3px 0 #ccc;
}
.sexRadio input[type='radio'] {
  display: none;
}
.sexRadio input[type='radio']:checked + label:before {
  content: '\2022';
  text-align: center;
  line-height: 0.7em;
  font-family: Tahoma;
  font-size: 1em;
  color: #020202;
  //   text-shadow: 0 0 10em #bbb;
}
.sendBtn {
  margin-left: 20%;
  width: 60%;
  border: black solid;
  border-radius: 0.5em;
  line-height: 2.5em;
  background: #03438d;
  box-shadow: -0.1em 0.1em 0em 0 black;
}
a.sendOutA-Disable {
  color: white;
}
.sendBtn-Active {
  margin-left: 20%;
  width: 60%;
  // border: black solid;
  border-radius: 0.5em;
  line-height: 2.5em;
  background: #eec32a;
  box-shadow: -0.1em 0.1em 0em 0 black;
}
.send-A {
  color: black;
  // font-weight: bold;
}
.sendOutA-Disable {
  pointer-events: none;
}
// SECOND TAB
.passwordBtn {
  margin-top: 8%;
  margin-left: 20%;
  width: 60%;
  border: #8b8d8f solid;
  border-radius: 0.5em;
  background: #a8b0b9;
  line-height: 2.5em;
}
a .passwordBtn {
  color: white;
  font-family: sans;
}
.secondTab-SendOutBtn-Active {
  margin-top: 8%;
  margin-left: 20%;
  width: 60%;
  border: black solid;
  border-radius: 0.5em;
  background: #eec32a;
  box-shadow: -0.1em 0.1em 0em 0 black;
  line-height: 2.5em;
}
</style>
