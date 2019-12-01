import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "bootstrap";
import "popper.js";
import "./assets/app.scss";
import { fb } from './firebase';
import VueFirestore from 'vue-firestore';
import VueCarousel from 'vue-carousel';
import Vue2Filters from 'vue2-filters';
import store from './store';
require("firebase/firestore");

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})
Vue.use(VueFirestore);
Vue.use(VueCarousel);
Vue.use(Vue2Filters);


Vue.component("NavBar", require("./components/NavBar.vue").default);
Vue.component("add-to-cart", require("./components/AddToCart.vue").default);
Vue.component("mini-cart", require("./components/MiniCart.vue").default);

Vue.config.productionTip = false;
Vue.config.devtools = true;



let app = ''

fb.auth().onAuthStateChanged(function () {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }

});


