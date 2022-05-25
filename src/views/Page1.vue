<template>
  <Nav class="nav" ref="nav"></Nav>
  <div class="background">
    <div class="page1Content">
      <router-view class="postsShow" @changeUserProfile="changeUserProfile"></router-view>
      <personal-sidebar class="personal-sidebar" ref="personalSidebar"></personal-sidebar>
      <!-- device -->
      <personal-sidebar-phone-device
        class="personal-sidebar-phoneDevice"
        ref="personalSidebarDevice"
      ></personal-sidebar-phone-device>
    </div>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import PersonalSidebar from '@/components/PersonalSidebar.vue';
import PersonalSidebarPhoneDevice from '@/components/PersonalSidebarPhoneDevice.vue';

export default {
  data() {
    return {};
  },
  components: {
    PersonalSidebar,
    PersonalSidebarPhoneDevice,
    Nav,
  },
  created() {},
  methods: {
    changeUserProfile() {
      this.$refs.personalSidebar.getUserInformation();
      this.$refs.nav.getUserInformation();
      this.$refs.personalSidebarDevice.getUserInformation();
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
}
.personal-sidebar {
  width: 38%;
  margin-left: 2em;
  margin-top: 20pt;
}
.personal-sidebar-phoneDevice {
  display: none;
}
// device RWD start
@media screen and (max-device-width: 75em) {
  .page1Content {
    display: block;
    margin-left: 7.5%;
    width: 85%;
  }
  // 左邊變100%
  .postsShow {
    width: 100%;
    margin-top: 20pt;
  }
  .personal-sidebar {
    display: none;
  }
  .personal-sidebar-phoneDevice {
    display: flex;
    height: auto;
    position: fixed;
    max-width: 85%;
    left: 7.4%;
    top: 80%;
  }
}
// device RWD end
</style>
