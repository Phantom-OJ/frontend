<template>
  <v-card id="root">
    <v-card-title id="title">
      {{$t('nav-user.sign-up')}}
    </v-card-title>
    <v-card-text>
      <v-form id="form">
        <div id="name">
          <v-text-field
            v-model="username"
            :label="$t('profile.mail')"
            :disabled="loading"
            :rules="[checkMail]"
          >
          </v-text-field>
        </div>
        <div id="nickname">
          <v-text-field
            v-model="nickname"
            :label="$t('profile.nickname')"
          ></v-text-field>
        </div>
        <div id="pwd">
          <v-text-field
            v-model="password"
            type="password"
            :label="$t('profile.pwd')"
            :disabled="loading"
            :hint="levelText[passwordLevel]"
            :color="levelColor[passwordLevel]"
            :rules="[checkPassword]"
          >111111111</v-text-field>
        </div>
        <div id="c-pwd">
          <v-text-field
            v-model="confirmedPassword"
            type="password"
            :label="$t('profile.c-pwd')"
            :rules="[checkPassword, confirm]"
          ></v-text-field>
        </div>
        <div id="v-code">
          <v-text-field
            v-model="vCode"
            :label="$t('profile.v-code')"
            style="width: 60%;display: inline-block"
          ></v-text-field>
          <v-btn
            id="v-code-send"
          >
            {{$t('send')}}
          </v-btn>
        </div>
        <div id="submit">
          <v-btn
            id="submit-btn"
            color="rgb(92,187,246)"
            @click="signUp"
            :loading="loading"
          >
            {{$t('submit')}}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import router from "@/router";
import {APIException} from "@/ts/exceptions";
import {Alert} from "@/ts/entries";

@Component({})
export default class SSignUpCard extends Vue {
  username: string = ''
  password: string = ''
  nickname: string = ''
  confirmedPassword: string = ''
  loading: boolean = false
  vCode: string = ''
  readonly levelColor = ['error', 'warning', 'warning', 'accent', 'success']

  get levelText() {
    return ['error.password', 'security.t-weak', 'security.weak', 'security.middle', 'security.strong']
      .map(i => this.$t(i).toString())
  }

  confirm(value:string) {
    return value === this.password || this.$t('error.confirm')
  }

  checkMail(value: string) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(value) || this.$t('error.mail')
  }

  checkPassword(value: string) {
    return value.length >= 6 || this.$t('error.password')
  }

  get passwordLevel() {
    let p = this.password
    if (p.length < 6)
      return 0
    let level = 0
    level += /[a-z]/.test(p) ? 1 : 0
    level += /[A-Z]/.test(p) ? 1 : 0
    level += /[0-9]/.test(p) ? 1 : 0
    level += /[^a-zA-Z0-9]/.test(p) ? 1 : 0
    return level
  }

  checkAll() {
    if(this.checkMail(this.username)!==true){
      this.$alert(new Alert({
        type:'error',
        info:this.checkMail(this.username).toString()
      }))
      return false
    }
    if(this.checkPassword(this.password)!==true){
      this.$alert(new Alert({
        type:'error',
        info:this.checkPassword(this.password).toString()
      }))
      return false
    }
    if(this.confirm(this.confirmedPassword)!==true){
      this.$alert(new Alert({
        type:'error',
        info:this.confirm(this.confirmedPassword).toString()
      }))
      return false
    }
    return true
  }

  async signUp() {
    if(!this.checkAll()) return
    this.loading = true
    try {
      let user = await this.$api.signUp({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        vCode: this.vCode
      })
      this.$store.commit('setUser', {user: user, isAuthenticated: true})
      await router.push((this.$route.query['then'] ?? '/') as string)
    } catch (e) {
      this.loading = false
      const error = e as APIException
      this.$alert(new Alert({
        type: 'error',
        info: error.info ?? error.toString(),
        time: 10000
      }))
    }
  }
}
</script>

<style scoped lang="scss">
  #root {
    width: 400px;
    max-width: 80%;
    margin: 20px auto;
  }

  #v-code-send {
    margin-left: 5%;
    display: inline-block;
    width: 35%;
  }

  #submit-btn {
    display: block;
    width: 100%;
    margin: 10px auto;
  }

  #form {
    div {
      margin-bottom: 10px;
    }
  }

</style>
<style lang="scss">

      .v-messages__message {
        font-size: 14px !important;
      }
</style>
