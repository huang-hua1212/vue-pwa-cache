<template>
  <div class="container my-Personal-Wall">
    <div class="pos_1">
      <div class="above">
        <div
          class="userHeadImg"
          :style="{ 'background-image': 'url(' + userHeadImg + ')' }"
          style="background-size: cover; background-position: center; overflow: hidden"
        ></div>
      </div>
      <div class="under"></div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios';

export default {
  data() {
    return {
      userHeadImg:
        'https://images.unsplash.com/photo-1536339258903-69fa31f99a28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    };
  },
  created() {},
  methods: {
    // getSpecifyIDInforms() {
    //   const id = '627a2742b2af092f54100b44';
    //   axios
    //     .get()
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((err) => {});
    // },
  },
};
</script>
<style lang="scss" scoped>
.my-Personal-Wall {
  margin-left: 0em;
  // height: 35.8em;
  height: 38em;
  // padding-right: 2%;
  padding-bottom: 0;
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
  border-radius: 0.5em;
  z-index: 0;
}
.above {
  position: absolute;
  height: 100%;
  width: 100%;
  background: white;
  border: black solid;
  border-radius: 0.5em;
  z-index: 100;
  text-align: center;
  vertical-align: middle;
}
.userHeadImg {
  width: 5em;
  height: 100%;
  border-radius: 0.5em 0 0 0.5em;
  border-right: black solid;
}
</style>
