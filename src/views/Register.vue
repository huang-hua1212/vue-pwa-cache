<template>
  <div class="background">
    <div class="box">
      <div class="LeftImg"><img src="../../svg/img.svg" alt="Loading..." /></div>
      <div class="RightForm">
        <div class="title"><h>MetalWall</h></div>
        <div class="subTitle"><h>註冊</h></div>
        <form>
          <div class="nickName-div">
            <input
              type="text"
              class="nickName-input"
              v-model="nickName"
              placeholder="暱稱"
              @keyup.prevent="isBtnSendOutActive()"
            />
          </div>
          <div class="email-div">
            <input
              type="email"
              class="email-input"
              v-model="email"
              placeholder="Email"
              @keyup.prevent="isBtnSendOutActive()"
            />
          </div>
          <div class="password-div">
            <input
              type="password"
              class="password-input"
              v-model="password"
              placeholder="Password"
              @keyup.prevent="isBtnSendOutActive()"
            />
          </div>
          <div class="btn-OuterDiv">
            <a
              type="button"
              :class="{ 'sendOutA-Active': isSendOutActive }"
              class="sendOutA"
              href="#"
              @click.prevent=""
              ><div class="sendOutBtn-Div" :class="{ 'sendOutBtn-Div-Active': isSendOutActive }">
                登入
              </div></a
            >
          </div>
        </form>
        <div class="btn-register-div">
          <a class="btn-register-a" type="button" href="#" @click.prevent="">註冊帳號</a>
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
      isSendOutActive: false,
      email: '',
      password: '',
      nickName: '',
    };
  },
  created() {},
  methods: {
    isBtnSendOutActive() {
      if (this.email && this.password && this.nickName) {
        this.isSendOutActive = true;
      } else {
        this.isSendOutActive = false;
      }
    },
    register() {
      const url = `${process.env.VUE_APP_API}/user/register`;
      const data = {
        name: this.nickName,
        username: this.email,
        password: this.password,
      };
      axios
        .post(url, data)
        .then(() => {
          // console.log(res);
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');

.background {
  word-break: break-all;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #efece7;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 6%;
}
.box {
  border: black solid;
  display: flex;
  width: auto;
  height: 24em;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 2%;
  padding-bottom: 3%;
  box-shadow: -8px 8px 0px #00040029;
}
.LeftImg {
  margin-top: 1.5em;
}
.RightForm {
  margin-left: 4em;
  text-align: center;
}
.title > h {
  font-size: 3.75em;
  font-family: 'Paytone One', sans-serif;
  font-weight: bold;
}
.subTitle > h {
  font-size: 1.1em;
  font-family: 'Paytone One', sans-serif;
  font-weight: bold;
}
.nickName-div {
  margin-top: 9%;
}
.nickName-div input {
  border: black solid;
  width: 100%;
  height: 2em;
  padding-left: 0.2em;
  font-size: 1.2em;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.email-div {
  margin-top: 5%;
}
.email-div input {
  border: black solid;
  width: 100%;
  height: 2em;
  padding-left: 0.2em;
  font-size: 1.2em;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.password-div {
  width: 100%;
  margin-top: 5%;
}
.password-div input {
  border: black solid;
  width: 100%;
  height: 2em;
  padding-left: 0.2em;
  font-size: 1.2em;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.btn-OuterDiv {
  margin-top: 9%;
  margin-bottom: 0;
}
a {
  text-decoration: none;
}
.sendOutA {
  pointer-events: none;
}
.sendOutBtn-Div {
  background: #a8b0b9;
  border: #808080 solid;
  border-radius: 0.5em;
  color: white;
  padding-top: 2.8%;
  padding-bottom: 2.8%;
  text-align: center;
  font-size: 1.1em;
}
.sendOutA-Active {
  pointer-events: auto;
}
.sendOutBtn-Div-Active {
  background: #03438d;
  border: black solid;
  border-radius: 0.5em;
  box-shadow: -0.2em 0.2em 0em 0 black;
  color: white;
  padding-top: 2.8%;
  padding-bottom: 2.8%;
  text-align: center;
  font-size: 1.1em;
}
.btn-register-div {
  margin-top: 0.5em;
}
.btn-register-div a {
  color: black;
}
</style>
