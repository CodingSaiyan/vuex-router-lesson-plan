<template>
    <div>
        Username: <input v-model="username" v-on:keyup.enter="login"/>
        Password: <input v-model="password" type="password" v-on:keyup.enter="login"/>
        <button v-on:click="login">Login</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if(!this.username || !this.password) return;
            axios.post('/api/login', {username: this.username, password: this.password}).then(res => {
                this.$store.commit('login')
                this.$router.push({path: '/'})
            }).catch(err => alert('Problem logging in'))
        }
    },
    mounted() {
        if(this.$store.state.loggedIn) this.$router.push({path: '/'})
    }
}
</script>

<style>

</style>