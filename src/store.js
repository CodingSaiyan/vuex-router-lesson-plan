import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    profile: {},
    users: []
  },
  mutations: {
    login(state) {
      state.loggedIn = true;
    },
    setProfile(state, data) {
      state.profile = data.profile 
      state.users = data.users
    },
    logout(state) {
      state.loggedIn = false
    }
  }
})
