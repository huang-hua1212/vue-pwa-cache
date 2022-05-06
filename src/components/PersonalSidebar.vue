<template>
  <div class="sidebar">
    <div class="side-w">
      <div class="postBtn">
        <router-link to="/create-post" class="postA">
          <p>張貼動態</p>
        </router-link>
        <!-- <a class="postA" type="button" href="#" @click.prevent=""><p>張貼動態</p></a> -->
      </div>
      <a type="button" class="sidebarBtn" href="#" @click.prevent="">
        <div class="function">
          <div class="postHeadImg"></div>
          <div class="posterName">
            <h3>名稱</h3>
          </div>
        </div></a
      >
      <a type="button" class="sidebarBtn" href="#" @click.prevent="">
        <div class="function">
          <div class="postHeadImg"></div>
          <div class="posterName">
            <h3>追蹤名單</h3>
          </div>
        </div>
      </a>
      <a type="button" class="sidebarBtn" href="#" @click.prevent="">
        <div class="function">
          <div class="postHeadImg"></div>
          <div class="posterName">
            <h3>我按讚的文章</h3>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '外面看起來就超冷!\n我決定回被窩裡繼續睡',
      imgs: [
        'https://images.unsplash.com/photo-1518805660775-eb21eab50e1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      ],
    };
  },
  created() {},
  methods: {},
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
.sidebarBtn {
  color: black;
}
.function {
  margin-top: 2em;
  height: auto;
  display: flex;
  align-items: center;
}
.postHeadImg {
  position: relative;
  border-radius: 50%;
  width: 4em;
  height: 0;
  padding-top: 4em;
  background: white;
  border: black solid;
}
.posterName {
  padding-left: 1em;
  line-height: 0.6pt;
}
</style>
