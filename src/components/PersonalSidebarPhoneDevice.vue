<template>
  <div class="sidebar">
    <div class="btn-1">
      <router-link to="/posts-with-comments"
        ><div class="circleBorder">
          <unicon
            class="estate"
            name="estate"
            fill="black"
            style="margin-top: 0.5em; width: 3.5em; height: 3.5em"
          ></unicon></div
      ></router-link>
    </div>
    <div class="btn-2">
      <router-link to="/followers-list"
        ><div class="circleBorder">
          <unicon
            class="bellIcon"
            name="bell"
            fill="black"
            style="margin-top: 0.5em; width: 3.5em; height: 3.5em"
          ></unicon></div
      ></router-link>
    </div>
    <div class="btn-3">
      <router-link to="/likes-list"
        ><div class="circleBorder">
          <unicon
            class="thumbsUpIcon"
            name="thumbs-up"
            fill="black"
            style="margin-top: 0.5em; width: 3.2em; height: 3.2em"
          ></unicon></div
      ></router-link>
    </div>
    <div class="btn-4">
      <router-link to="/create-post"
        ><div class="circleBorder plusIcon-Div">
          <unicon
            class="plusIcon"
            name="plus"
            fill="white"
            style="margin-top: 0.8em; width: 3.2em; height: 3.2em"
          ></unicon></div
      ></router-link>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {};
  },
  created() {
    this.getUserInformation();
  },
  methods: {
    getUserInformation() {
      const id = '6277d49f5b11695971e06846';
      const url = `https://blooming-sands-85089.herokuapp.com/users/${id}`;

      axios
        .get(url)
        .then((res) => {
          const userProfile = res.data.datas;
          this.headImg = userProfile.photo;
          this.name = userProfile.name;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  width: 100%;
  border: black solid;
  border-radius: 5em;
  background: white;
  z-index: 201;
  vertical-align: middle;
  text-align: center;
  background: #efece7;
}
.sidebar {
  /* padding not affect size */
  -webkit-box-sizing: border-box;
  /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
  /* Firefox, other Gecko */
  box-sizing: border-box;
  /* Opera/IE 8+ */
  justify-content: center;
}
.btn-1 {
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.btn-2,
.btn-3,
.btn-4 {
  margin-left: 11%;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.circleBorder {
  background: white;
  border-radius: 50%;
  width: 5em;
  height: 5em;
  //   width: 300%;
  //   height: 300%;
  background: white;
  border: black solid;
  /* foricon */
  vertical-align: middle;
  text-align: center;
}
.plusIcon-Div {
  background: #03438d;
}
</style>
