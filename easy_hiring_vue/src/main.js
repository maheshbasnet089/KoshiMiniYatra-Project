import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import VueCookies from "vue-cookies";
import "./main.css";

Vue.config.productionTip = false;

axios.interceptors.request.use((config) => {
  config.baseURL = "http://localhost:3000";
  config.withCredentials = true;
  return config;
});

function loggedIn() {
  console.log("token", VueCookies.get("token"));
  return window.localStorage.getItem("key") || VueCookies.get("token");
}
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!loggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.public)) {
    next();
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
