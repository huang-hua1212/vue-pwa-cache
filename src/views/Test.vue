<template>
  <div><button @click="sign_in()">登入</button></div>
  <div><button @click="verify()">驗證</button></div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {};
  },
  created() {
    // axios.defaults.withCredentials = true;
  },
  methods: {
    sign_in() {
      axios.defaults.withCredentials = true;
      const url = `${process.env.VUE_APP_API}/session-login/sign_in`;
      const data = {
        firstName: 'aha@gmail.com',
        lastName: 'a123456',
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verify() {
      const url = `${process.env.VUE_APP_API}/session-login/verify`;
      const data = {
        firstName: 'aha@gmail.com',
        lastName: 'a123456',
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
