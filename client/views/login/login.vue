<template>
  <form class="login-form" @submit="doSumbit">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">{{ errorMsg }}</span>
    </h1>
    <input
      type="text"
      class="login-input"
      placeholder="Username"
      v-model="username"
    />
    <input
      type="password"
      class="login-input"
      placeholder="Password"
      v-model="password"
      autocomplete="new-password"
    />
    <button type="submit" class="login-btn">Login</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      errorMsg: '',
      username: 'hale',
      password: '123456'
    }
  },
  methods: {
    validate() {
      if (!this.username.trim()) {
        this.errorMsg = '用户名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    },
    doSumbit(event) {
      event.preventDefault()
      if (this.validate()) {
        this.login({
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.$router.replace('/app')
          })
          .catch(error => console.log(error))
      }
    },
    ...mapActions(['login'])
  }
}
</script>

<style lang="stylus" scoped>
.login-form
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 350px
  margin: 0 auto
  padding: 20px 0
  background-color: #fff

  h1
    font-weight: 100
    color: #3d3d3d

.login-input
  appearance: none
  line-height: 30px
  margin-bottom: 20px
  border: 1px solid #aaa
  width: 100%
  border-radius: 0
  box-shadow: 0 0 0
  text-indent: 5px

.login-btn
  appearance: none
  width: 100%
  line-height: 30px
  text-align: center
  background-color: #0d60c7
  color: #eaeaea
  cursor: pointer
  border-color: #0d60c7
  transition: all 0.3s

  &:hover
    color: #fff
    background-color: darken(#0d60c7, 10)

.error-msg
  font-size: 12px
  color: red

@media screen and (max-width: 600px)
  .login-form
    width: 90%

  .login-input
    line-height: 40px
</style>
