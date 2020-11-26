<template>
  <v-card id="s-login-root">
    <v-card-title id="title">
      {{$t('nav-user.login')}}
    </v-card-title>
    <v-form id="s-login-form">
      <div id="s-login-name">
        <v-text-field
          v-model="username"
          :label="$t('profile.mail')"
        >
        </v-text-field>
      </div>
      <div id="s-login-pwd">
        <v-text-field
          v-model="password"
          type="password"
          :label="$t('profile.pwd')"
          hide-details
        >
        </v-text-field>
      </div>
      <div id="s-forget-pwd">
        <a class="s-link" v-text="$t('profile.f-pwd')" @click="$router.push('/forget-pwd')"/>
      </div>
      <div id="s-login-submit">
        <v-btn
          id="submit-btn"
          color="rgb(92,187,246)"
          @click="login"
          :loading="loading"
        >
        {{$t('nav-user.login')}}
        </v-btn>
      </div>
      <div id="s-login-sign-up">
        <v-btn
          id="sign-up-btn"
          color="rgb(76,175,80)"
          @click="signUp"
          :disabled="loading"
        >
        {{$t('nav-user.sign-up')}}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import router from "@/router";
import {APIException} from "@/ts/exceptions";
import {Alert} from "@/ts/entities";

@Component({})
export default class SLoginCard extends Vue {
  username: string = ''
  password: string = ''
  loading: boolean = false

  async login(){
    this.loading = true
    try {
      let user = await this.$api.login({
        username: this.username,
        password: this.password
      })
      this.$store.commit('setUser', {user: user, isAuthenticated: true})
    }catch (e) {
      this.loading = false
      const error = e as APIException
      this.$alert(new Alert({
        type: 'error',
        info: error.info ?? error.toString(),
        time: 10000
      }))
      return
    }
    await router.push((this.$route.query['then']??'/') as string)
  }

  signUp(){
    this.$router.push({name:'sign-up', query:this.$route.query})
  }

}
</script>

<style scoped lang="scss">
  #s-login-root {
    margin: 20px auto;
    padding-bottom: 15px;
    width: 400px;
    max-width: 80%;
  }

  #s-login-form {
    margin: 10px 20px;
  }

  #s-login-pwd {
    height: 70px;
    margin-top:10px;
  }

  #submit-btn, #sign-up-btn{
    display: block;
    width: 100%;
    margin: 20px auto;
  }

  #s-login-sign-up{
    margin-bottom: 20px;
  }

  #s-forget-pwd{
    text-align: right;
  }
</style>
