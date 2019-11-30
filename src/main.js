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
require("firebase/firestore");

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

Vue.component("NavBar", require("./components/NavBar.vue").default);

Vue.config.productionTip = false;

Vue.use(VueFirestore);

let app = ''

fb.auth().onAuthStateChanged(function () {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }

});


