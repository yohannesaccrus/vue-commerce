import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import "bootstrap";
import "popper.js";
import "./assets/app.scss";

Vue.component("NavBar", require("./components/NavBar.vue").default);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
