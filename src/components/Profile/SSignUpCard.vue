<template>
  <v-card class="account-card">
    <v-card-title id="title">
      {{ $t('nav-user.sign-up') }}
    </v-card-title>
    <v-card-text>
      <v-form id="s-login-form">
        <div id="name">
          <v-text-field
            v-model="username"
            :label="$t('profile.mail')"
            :disabled="waitForRes"
            :rules="[checkMail]"
            validate-on-blur
          >
          </v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="nickname"
            :label="$t('profile.nickname')"
            :disabled="waitForRes"
          ></v-text-field>
        </div>
        <s-set-password :password.sync="password" :confirmed.sync="confirmed" :wait-for-res="waitForRes"
                        :pwd-label="$t('profile.pwd')" :c-pwd-lable="$t('profile.c-pwd')"/>
        <div class="v-code">
          <v-text-field
            v-model="vCode"
            :label="$t('profile.v-code')"
            class="v-code-text"
            :disabled="waitForRes"
          ></v-text-field>
          <v-btn
            class="v-code-send"
            @click="sendVCode"
            :disabled="sendVCodeDisable"
          >
            {{ nextSend || $t('send') }}
          </v-btn>
        </div>
        <div>
          <v-btn
            class="s-submit-btn"
            color="primary"
            @click="signUp"
            :loading="waitForRes"
          >
            {{ $t('nav-user.sign-up') }}
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {Alert, VCodeMode} from "@/ts/entities";
import {SUtil} from "@/ts/utils";
import SSetPassword from "@/components/Profile/SSetPassword.vue";

@Component({
  components: {SSetPassword}
})
export default class SSignUpCard extends Vue {
  readonly keyInState = 'sign-up'
  username: string = ''
  password: string = ''
  nickname: string = ''
  confirmed: boolean = false
  sendVCodeDisable: boolean = false
  vCode: string = ''
  nextSend: number = 0
  waitForRes: boolean = false
  intervals: number[] = []

  created() {
    this.intervals.push(window.setInterval(() => this.nextSend = Math.max(0, this.nextSend - 1), 1000))
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (window.state[this.keyInState].hasOwnProperty(stateKey)&&this.hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
  }

  beforeDestroy() {
    window.state[this.keyInState] = {
      username: this.username,
      password: this.password,
      nickname: this.nickname
    }
  }

  checkMail(value: string) {
    return SUtil.checkMail(value) || this.$t('error.mail')
  }

  checkPassword(value: string) {
    return value.length >= 6 || this.$t('error.password')
  }

  checkAll() {
    if (this.checkMail(this.username) !== true) {
      this.$alert(new Alert({
        type: 'error',
        info: this.checkMail(this.username).toString()
      }))
      return false
    }
    if (this.checkPassword(this.password) !== true) {
      this.$alert(new Alert({
        type: 'error',
        info: this.checkPassword(this.password).toString()
      }))
      return false
    }
    if (this.confirmed) {
      this.$alert(new Alert({
        type: 'error',
        info: this.$t('error.confirm').toString()
      }))
      return false
    }
    return true
  }

  async sendVCode() {
    if (!SUtil.checkMail(this.username)) {
      this.$alert(new Alert({
        type: 'error',
        info: this.checkMail(this.username).toString()
      }))
      return false
    }
    this.sendVCodeDisable = true
    const msg = await this.$api.sendVCode({
      username: this.username,
      mode: VCodeMode.REGISTER
    })
    if (!msg) {
      this.sendVCodeDisable = false
      return false
    }
    this.$alert(new Alert({
      type: 'success',
      info: this.$t('success.v-code').toString()
    }))
    this.nextSend = 30
    setTimeout(() => this.sendVCodeDisable = false, 30000)
  }

  async signUp() {
    if (!this.checkAll()) return
    this.waitForRes = true
    try {
      let user = await this.$api.signUp({
        username: this.username,
        password: this.password,
        nickname: this.nickname,
        verifyCode: this.vCode
      })
      this.$store.commit('setUser', {user: user, isAuthenticated: true})
      await this.$router.push(this.$route.query['then'].toString() ?? '/')
    } catch (e) {
      this.waitForRes = false
      SUtil.alertAPIException(e, this)
    }
  }
}
</script>

<style scoped lang="scss">
#s-login-root {
  width: 400px;
  max-width: 80%;
  margin: 20px auto;
}

#s-login-form {
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
