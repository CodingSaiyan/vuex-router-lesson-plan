<template>
  <div>
    {{userProfile.name}}
    <img :src="userProfile.pictureUrl"/>
    <div v-for="post in userProfile.posts"
    :key="post.id">
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
    axios.get(`/api/user/${this.$router.history.current.params.id}`).then(res => {
      this.userProfile = res.data
    }).catch(err => err.response.data === 'Not Authorized' ? this.$router.push({path: '/login'}) : alert('Could not retrieve user'))
  }
}
</script>

<style>

</style>
