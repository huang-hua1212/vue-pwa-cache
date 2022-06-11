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
  created() {},
  methods: {
    sign_in() {
      // const config = {
      //   withCredentials: true,
      //   headers: { 'Access-Control-Allow-Origin': '*' },
      //   crossdomain: true,
      // };
      axios.defaults.withCredentials = true;
      // 必須用localhost才可以save cookie，若用heroku會儲存不了cookie
      const url = `${process.env.VUE_APP_API}/session-login/sign_in`;
      // const url = 'https://all-the-cors.herokuapp.com/blooming-sands-85089.herokuapp.com/session-login/sign_in';
      // const url = 'http://localhost:3000/session-login/sign_in';
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
