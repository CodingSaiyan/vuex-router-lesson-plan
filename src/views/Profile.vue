<template>
  <div class="profile-main-container">
    <div class="profile-user-info">
      <span>{{profile.name}}</span>
      <img :src="profile.pictureUrl" class="profile-image"/>
      <div v-for="post in profile.posts"
      :key="post.id"
      class="profile-post">
      {{post.text}}
      </div>
    </div>
    <div class="profile-users-container">
      <span><u>Users</u></span>
      <div v-for="user in users"
      :key="user.id"
      v-on:click="loadUserProfile(user.id)"
      class="users-div">
        {{user.name}}
      </div>
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
.profile-main-container {
  display: flex;
}
.profile-user-info {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
}
.profile-image {
  width: 300px;
  height: 300px;
}
.profile-post {
  padding: 10px;
  border: .5px solid black;
  width: 350px;
}
.profile-users-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}
.users-div {
  margin: 5px 0px;
}
.users-div:hover {
  cursor: pointer;
}
</style>    