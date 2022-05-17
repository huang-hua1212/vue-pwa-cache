<template>
  <div class="background">
    <div class="box">
      <div class="LeftImg"><img src="../../svg/img.svg" alt="Loading..." /></div>
      <div class="RightForm">
        <div class="title"><h>MetalWall</h></div>
        <div class="subTitle"><h>到元宇宙展開全新社團</h></div>
        <form>
          <div class="email-div"><input type="email" class="email-input" /></div>
          <div class="password-div"><input type="password" class="password-input" /></div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');

.background {
  width: 100%;
  height: 100%;
  background: #efece7;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 10%;
}
.box {
  border: black solid;
  display: flex;
  margin-left: 20%;
  width: 60%;
  height: 70%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-left: 3%;
  padding-top: 1%;
}
.LeftImg {
  margin-top: 1.5em;
}
.RightForm {
  margin-left: 13%;
  border: black solid;
  text-align: center;
  width: 40%;
}
.title > h {
  font-size: 3em;
  font-family: 'Paytone One', sans-serif;
  font-weight: bold;
}

.subTitle > h {
  font-size: 1.1em;
  font-family: 'Paytone One', sans-serif;
  font-weight: bold;
}
.email-div {
  width: 97.5%;
  margin-top: 9%;
}
.email-div input {
  width: 100%;
  height: 2em;
  padding: 0.2em
}
.password-div {
  width: 97.5%;
  margin-top: 5%;
}
.password-div input {
  width: 100%;
  height: 2em;
  padding: 0.2em
}
</style>
