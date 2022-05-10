<template>
  <div class="background">
    <!-- <nav class="nav"></nav> -->
    <div class="page1Content">
      <!-- <post class="posts"></post> -->
      <router-view class="postsShow" @changeUserProfile="changeUserProfile"></router-view>
      <personal-sidebar class="personal-sidebar" ref="personalSidebar"></personal-sidebar>
    </div>
  </div>
</template>
<script>
import PersonalSidebar from '@/components/PersonalSidebar.vue';

export default {
  data() {
    return {};
  },
  components: {
    PersonalSidebar,
  },
  created() {},
  methods: {
    changeUserProfile() {
      this.$refs.personalSidebar.getUserInformation();
    },
  },
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
  padding-top: 2em;
  margin-left: 18.2%;
  width: 63.6%;
}
.postsShow {
  width: 60%;
  margin-top: 20pt;
//   margin-right: 1em;
}
.personal-sidebar {
  width: 38%;
  margin-left: 2em;
  margin-top: 20pt;
}
</style>
