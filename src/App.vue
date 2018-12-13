<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-if="this.loggedIn">Profile</router-link>
      <router-link to="/login" v-else>Login</router-link> 
      <button v-if="this.loggedIn" v-on:click="logout">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'App',
  computed: {
    ...mapState({
      loggedIn: state => state.loggedIn
    })
  },
  methods: {
    logout() {
      axios.delete('/api/logout').then( res => {
        console.log(1111)
      this.$store.commit('logout')
      this.$router.go('login')
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0px 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
