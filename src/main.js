import { createApp } from 'vue';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Vue Unicon
import Unicon from 'vue-unicons';
import {
  uniBell, uniThumbsUp, uniSearch, uniEllipsisH, uniEstate, uniPlus,
} from 'vue-unicons/dist/icons';
// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate'; // defineRule,
// 匯入 vee-validate 相關規則
import {
  required, email, min,
} from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

// Unicon
Unicon.add([uniBell, uniThumbsUp, uniSearch, uniEllipsisH, uniEstate, uniPlus]);
// fontawesom
library.add(fas);
// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.use(router);
app.use(Unicon);
app.component('font-awesome-icon', FontAwesomeIcon);
// vee-validate
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
