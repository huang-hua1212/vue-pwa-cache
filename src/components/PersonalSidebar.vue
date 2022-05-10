<template>
  <div class="sidebar">
    <div class="side-w">
      <div class="postBtn">
        <router-link to="/create-post" class="postA">
          <p>張貼動態</p>
        </router-link>
        <!-- <a class="postA" type="button" href="#" @click.prevent=""><p>張貼動態</p></a> -->
      </div>
      <router-link to="/modify-personal-profile" class="sidebarBtn">
        <div class="function">
          <div
            class="postHeadImg"
            :style="{ 'background-image': 'url(' + this.headImg + ')' }"
            style="background-size: cover; background-position: center; overflow: hidden"
          ></div>
          <div class="posterName">
            <h3>{{ this.name }}</h3>
          </div>
        </div></router-link
      >
      <router-link to="/followers-list" class="sidebarBtn-2">
        <div class="function">
          <div class="circleBorder">
            <unicon class="bellIcon" name="bell"  fill="royalblue"></unicon>
          </div>
          <div class="posterName">
            <h3>追蹤名單</h3>
          </div>
        </div>
      </router-link>
      <router-link to="/likes-list" class="sidebarBtn-3">
        <div class="function">
          <div class="circleBorder">
            <unicon class="thumbs-up" name="thumbs-up" fill="royalblue"></unicon>
          </div>
          <div class="posterName">
            <h3>我按讚的文章</h3>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      headImg: '',
      name: '',
      // color_1: 'royalblue',
      // color_2: 'royalblue',
    };
  },
  created() {
    this.getUserInformation();
  },
  methods: {
    getUserInformation() {
      const id = '6277d49f5b11695971e06846';
      const url = `https://blooming-sands-85089.herokuapp.com/user/${id}`;

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
<style lan="scss" scped>
.sidebar {
  width: 100%;
  height: 26em;
  border: black solid;
  background: white;
}
.side-w {
  width: 80%;
  margin-left: 10%;
}
.postBtn {
  width: 100%;
  height: 3.3em;
  margin-top: 1.3em;
  border: black solid;
  border-radius: 0.3em;
  box-shadow: -0.1em 0.1em 1px 0.05em black;
}
.postA {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  background: #03438d;
  color: white;
}
a {
  text-decoration: none;
}
.sidebarBtn,
.sidebarBtn-2,
.sidebarBtn-3 {
  color: black;
}
.function {
  margin-top: 2em;
  height: auto;
  display: flex;
  align-items: center;
}
.postHeadImg {
  /* position: relative; */
  border-radius: 50%;
  width: 4em;
  height: 0em;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.circleBorder {
  /* position: relative; */
  border-radius: 50%;
  width: 4em;
  height: 4em;
  /* padding-top: 4em; */
  background: white;
  border: black solid;
  /* foricon */
  vertical-align: middle;
  text-align: center;
}
.circleBorder {
  background: #e2edfa;
}
.posterName {
  padding-left: 1em;
  line-height: 0.6pt;
}
/* Icon */
.bellIcon {
  width: 2.2em;
  height: 3em;
  margin-top: 0.4em;
}
.thumbs-up {
  width: 1.8em;
  height: 2.5em;
  margin-top: 0.6em;
}
.sidebarBtn-2:hover .circleBorder {
  background-color: #03438d;
}
.sidebarBtn-2:hover .bellIcon {
  fill: white;
}
.sidebarBtn-2:hover h3 {
  color: #03438d;
  font-weight: bold;
}
.sidebarBtn-3:hover .circleBorder {
  background-color: #03438d;
}
.sidebarBtn-3:hover h3 {
  color: #03438d;
  font-weight: bold;
}
.sidebarBtn-3:hover .thumbs-up {
  fill: white;
}
</style>
