<template>
  <div class="container followers-List">
    <div class="followers">
      <div class="pos_1">
        <div class="above"><h3>追蹤名單</h3></div>
        <div class="under"></div>
      </div>
      <div class="pos_2">
        <a type="button" class="uploadImg" href="#" @click.prevent="">
          <div class="follower">
            <div class="followerHeadImg" style="width: 3.5em; padding-top: 3.5em"></div>
            <div class="followerName">
              <h3>名稱</h3>
              <h5>追蹤時間: 2022/05/01</h5>
            </div>
            <h5 class="followDays">您已追蹤90天</h5>
          </div>
        </a>
      </div>
      <div class="pos_2">
        <a type="button" class="uploadImg" href="#" @click.prevent="">
          <div class="follower">
            <div class="followerHeadImg" style="width: 3.5em; padding-top: 3.5em"></div>
            <div class="followerName">
              <h3>名稱</h3>
              <h5>追蹤時間: 2022/05/01</h5>
            </div>
            <h5 class="followDays">您已追蹤90天</h5>
          </div>
        </a>
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
.followers-List {
  margin-left: 0em;
  height: 35.8em;
  // padding-right: 2%;
  padding-bottom: 0;
}
.followers {
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
  border-radius: 0.5em;
  margin-top: 2em;
  border: black solid;
  width: 100%;
  background: white;
  box-shadow: 0 0.2em 0em -0.005em black;
}
.follower {
  display: flex;
  margin-left: 1em;
  margin-top: 0.8em;
  margin-bottom: 0.1em;
  color: black;
}
.followerHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.followerName {
  padding-left: 1em;
  line-height: 0.6pt;
}
.followDays {
  margin-left: auto;
  margin-right: 2em;
  margin-top: 2.5em;
}
</style>
