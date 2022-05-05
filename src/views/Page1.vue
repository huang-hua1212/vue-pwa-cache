<template>
  <div class="background">
    <div class="page1Content">
      <!-- <post class="posts"></post> -->
      <router-view class="postsShow"></router-view>
      <personal-sidebar class="personal-sidebar"></personal-sidebar>
    </div>
  </div>
</template>
<script>
// import Post from '@/components/Posts.vue';
import PersonalSidebar from '@/components/PersonalSidebar.vue';

export default {
  data() {
    return {};
  },
  components: {
    // Post,
    PersonalSidebar,
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.background {
  width: 100%;
  height: auto;
//   padding-bottom: 20em;
  background: #efece7;
}
.page1Content {
  display: flex;
  margin-top: 30pt;
  margin-left: 18.2%;
  width: 63.6%;
//   border: black solid;
}
.postsShow {
  width: 60%;
  margin-top: 20pt;
  margin-right: 1em;
}
.personal-sidebar {
  width: 38%;
  margin-left: 2em;
  margin-top: 20pt;
}
</style>
