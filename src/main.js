// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import jquery from 'jquery'

Vue.config.productionTip = false
Vue.prototype.$jq = jquery

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    remember: false,
    avatar: '',
    username: ''
  },
  mutations: {
    initialState(state, profile) {
      state.remember = true;
      state.avatar = profile.avatar;
      state.username = profile.name;
    },
    setRemember(state) {
      state.remember = true;
    },
    changeAvatar(state) {
      state.avatar = `../../static/image/avatar/avatar${Math.ceil(Math.random() * 45)}.jpg`
    },
    updateUsername(state, username) {
      state.username = username
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
