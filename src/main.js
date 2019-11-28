import Vue from 'vue'
import App from './App.vue'
import {router} from "./router";
import VueResource from "vue-resource";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faArrowDown, faArrowLeft,faArrowRight, faArrowUp, faUserSecret, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import _ from 'lodash';
Object.defineProperty(Vue.prototype, '$_', { value: _ });



library.add(faUserSecret);
library.add(faArrowUp,faArrowDown,faArrowRight,faArrowLeft,faMinusCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  el: '#app',
  mode: history,
  render: h => h(App),
  router,
})
