import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "es6-promise/auto";
import "./registerServiceWorker";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    idx: 0 //starting at 0 to be able to %4
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
