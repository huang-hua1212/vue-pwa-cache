<template>
  <div class="navbar">
    <div class="navBar-Div">
      <router-link to="/posts-with-comments"><h1>MetaWall</h1></router-link>
      <div class="navRight">
        <div
          class="headImg"
          :style="{ 'background-image': 'url(' + this.headImg + ')' }"
          style="
            background-size: cover;
            background-position: center;
            overflow: hidden;
            width: 2.5em;
            padding-top: 2.5em;
          "
        ></div>
        <a
          class="navRight-Name-A"
          type="button"
          href="#"
          @click.prevent=""
          @mouseenter="
            {
              isDropDown = true;
            }
          "
          ><div class="navRight-Name"><h>Member</h></div>
        </a>
        <transition
          name="fade"
          class="dropDown-List"
          v-if="isDropDown"
          @mouseenter="
            {
              isDropDown = true;
            }
          "
          @mouseleave="
            {
              isDropDown = false;
            }
          "
        >
          <ul class="dropDonw-List-Ul">
            <router-link :to="`/personal-wall/6277d49f5b11695971e06846`">
              <li style="">我的貼文牆</li>
            </router-link>
            <router-link to="/modify-personal-profile">
              <li>修改個人資料</li>
            </router-link>
            <router-link to="">
              <li class="last">登出</li>
            </router-link>
          </ul>
        </transition>
        <transition
          name="fade"
          class="dropDown-List-Under"
          v-if="isDropDown"
          @mouseenter="
            {
              isDropDown = true;
            }
          "
          @mouseleave="
            {
              isDropDown = false;
            }
          "
        >
          <div></div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      headImg: '',
      isDropDown: false,
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
a {
  text-decoration: none;
}
.navbar {
  border-bottom: black solid;
}
.navBar-Div {
  display: flex;
  width: 63.6%;
  margin-left: 18.2%;
  //   vertical-align: middle;
}
.navBar-Div h1 {
  color: black;
  font-family: 'Paytone One', sans-serif;
}
.headImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
  margin-right: 0.5em;
}
.navRight {
  display: flex;
  align-items: center;
  //   text-align: center;
  margin-left: auto;
  margin-right: 0;
}
.navRight-Name {
  border-bottom: black solid;
  padding-left: 0.2em;
  padding-right: 0.6em;
  color: black;
}
.navRight h {
  font-size: 1em;
  font-family: 'Paytone One', sans-serif;
  font-weight: bold;
}
//post-edit dropdown start
.dropDown-List {
  cursor: pointer;
  //   border-radius: 0.5em;
  width: 12em;
  z-index: 201;
  background-color: #ffffff;
  border: black solid;
  position: absolute;
  //   padding-left: 5%;
  margin-top: 12em;
  text-align: center;
}
.dropDown-List-Under {
  width: 12em;
  height: 6.5em;
  background-color: #ffffff;
  margin-top: 12em;
  margin-left: 0.5em;
  position: absolute;
  border: black solid;
  z-index: 200;
}
.navRight-Name-A:hover ~ .dropDown-List,
.dropDown-List-Under {
  opacity: 1;
}
.dropDown-List {
  padding-inline-start: 0px;
}
.dropDown-List li {
  list-style-type: none;
  margin-bottom: 13px;
  vertical-align: middle;
  border-bottom: black solid;
  line-height: 2em;
  margin: 0;
  color: black;
  font-family: 'Paytone One', sans-serif;
}
.dropDown-List .last {
  border-bottom: none;
}
// post-edit dropDown list end
@media screen and (max-device-width: 75em) {
  .navBar-Div {
    display: flex;
    width: 85%;
    margin-left: 7.5%;
    //   vertical-align: middle;
  }
}
</style>
