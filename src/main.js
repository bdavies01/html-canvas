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
    idx: 1
  },
  mutations: {
    setState(state, n) {
      state.idx = n;
    }
  }
});

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
