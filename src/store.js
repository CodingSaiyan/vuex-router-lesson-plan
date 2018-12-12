import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    profile: {}
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    setProfile(state, profile) {
      state.profile = profile
    }
  }
})
