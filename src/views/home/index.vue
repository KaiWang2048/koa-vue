<template>
  <div title="商家列表">
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <button @click="login">登陆</button>
  </div>
</template>
<script type="text/babel">
  export default {
    data() {
      return {
        title: '',
        username: '',
        password: '',
        nameList: []
      }
    },
    created() {
      this.getList()
      this.http.get('/detail').then((res) => {
        this.title = res
      })
    },
    mounted() {
    },
    methods: {
      add() {
        this.http.post('/save', {
          name: 'hello,world'
        }).then((res) => {
          this.getList()
        })
      },
      getList() {
        this.http.get('/home').then((res) => {
          this.nameList = res.data;
        })
      },
      login() {
        this.http.post('/login', {
          username:this.username,
          password:this.password
        }).then(res => {
          window.localStorage.setItem('token', res.token)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
</style>
