<template>
  <div class="user-main-container">
    <span>{{userProfile.name}}</span>
    <img :src="userProfile.pictureUrl" class="profile-image"/>
    <div v-for="post in userProfile.posts"
    :key="post.id"
    class="profile-post">
    {{post.text}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'User',
  data() {
    return {
      userProfile: {}
    }
  },
  mounted() {
    axios.get(`/api/user/${this.$route.params.id}`).then(res => {
      this.userProfile = res.data
    }).catch(err => err.response.data === 'Not Authorized' ? this.$router.push({path: '/login'}) : alert('Could not retrieve user'))
  }
}
</script>

<style>
.user-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
