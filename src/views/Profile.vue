<template>
  <div>
    {{profile.name}}
    <img :src="profile.pictureUrl"/>
    <div v-for="post in profile.posts"
    :key="post.id">
    {{post.text}}
    </div>
    <div v-for="user in users"
    :key="user.id"
    v-on:click="loadUserProfile(user.id)">
      {{user.name}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  mounted() {
    if(!this.$store.state.loggedIn) {
      axios.get('/api/profile').then( res => {
        this.$store.commit('login')
        this.loadProfile()
      }).catch(err => this.$router.push('login'))
    } else {
      if(!this.$store.state.profile.name) this.loadProfile()
    }
  },
  methods: {
    loadProfile() {
      axios.get('/api/profile').then(res => {
        this.$store.commit('setProfile', res.data)
      }).catch(err => this.$router.push('login'))
    },
    loadUserProfile(id) {
      this.$router.push({path: `/user/${id}`})
    }
  },
  computed: {
    ...mapState({
      profile: state => state.profile,
      users: state => state.users
    })
  }
}
</script>

<style>

</style>    