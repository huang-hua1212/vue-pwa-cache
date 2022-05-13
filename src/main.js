import { createApp } from 'vue';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Vue Unicon
import Unicon from 'vue-unicons';
import {
  uniBell, uniThumbsUp, uniSearch, uniEllipsisH,
} from 'vue-unicons/dist/icons';

import App from './App.vue';
import router from './router';

// temp Unicon
Unicon.add([uniBell, uniThumbsUp, uniSearch, uniEllipsisH]);
// temp fontawesom
library.add(fas);

// const app = createApp(App).use(router);
const app = createApp(App);
app.use(router);
app.use(Unicon);
app.component('font-awesome-icon', FontAwesomeIcon);
// app.component('BIcon', BIcon);
// app.component('BIconArrowUp', BIconArrowUp);
// app.component('BIconArrowDown', BIconArrowDown);

app.mount('#app');
