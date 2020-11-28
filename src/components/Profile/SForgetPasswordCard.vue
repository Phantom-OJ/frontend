<template>
  <v-card class="account-card">
    <v-card-title>
      {{$t('profile.f-pwd')}}
    </v-card-title>
    <v-card-text>
      <v-form id="s-fpwd-form">
        <div id="s-fpwd-name">
          <v-text-field
            v-model="username"
            :label="$t('profile.mail')"
            :rules="[checkMail]"
            validate-on-blur
          />
        </div>
        <div id="s-fpwd-n-pwd">
          <v-text-field
            v-model="password"
            type="password"
            :label="$t('profile.n-pwd')"
            :disabled="waitForRes"
            :hint="levelText[passwordLevel]"
            :color="levelColor[passwordLevel]"
            :rules="[checkPassword]"
            validate-on-blur
          />
        </div>
        <div>
          <v-text-field
            v-model="confirmedPassword"
            type="password"
            :disabled="waitForRes"
            :label="$t('profile.c-pwd')"
            :rules="[checkPassword, confirm]"
            validate-on-blur
          ></v-text-field>
        </div>
        <div id="s-fpwd-v-code">
          <v-text-field v-model="vCode" :label="$t('profile.v-code')" class="v-code-text"/>
          <v-btn
            class="v-code-send"
            @click="sendVCode"
            :disabled="sendVCodeDisable"
          >
            {{nextSend||$t('send')}}
          </v-btn>
        </div>
        <div id="s-fpwd-submit">
          <v-btn
            class="s-submit-btn"
            color="primary"
            @click="submit"
            :loading="waitForRes"
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
import {SUtil} from "@/ts/utils";
import {Alert, VCodeMode} from "@/ts/entities";

@Component({})
export default class SForgetPasswordCard extends Vue {
  username: string = ''
  vCode: string = ''
  password: string = ''
  sendVCodeDisable: boolean = false
  confirmedPassword:string=''
  nextSend: number = 0
  waitForRes:boolean = false
  intervals: number[] = []
  readonly levelColor = SUtil.pLevelColor

  created() {
    this.intervals.push(window.setInterval(() => this.nextSend = Math.max(0, this.nextSend - 1), 1000))
  }

  checkMail(value: string) {
    return SUtil.checkMail(value) || this.$t('error.mail')
  }

  get levelText() {
    return SUtil.pLevelText.map(i => this.$t(i).toString())
  }

  checkPassword(value: string) {
    return value.length >= 6 || this.$t('error.password')
  }

  get passwordLevel() {
    return SUtil.passwordLevel(this.password)
  }

  confirm(value: string) {
    return value === this.password || this.$t('error.confirm')
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
    if (this.confirm(this.confirmedPassword) !== true) {
      this.$alert(new Alert({
        type: 'error',
        info: this.confirm(this.confirmedPassword).toString()
      }))
      return false
    }
    return true
  }

  async submit() {
    if(!this.checkAll()) return
    this.waitForRes = true
    try{
      const msg = await this.$api.resetPassword({
        username:this.username,
        password:this.password,
        vCode:this.vCode
      })
      this.$alert(new Alert({
        type:'success',
        info: msg
      }))
      await this.$router.replace('/login')
    }catch (e) {
      this.waitForRes = false
      SUtil.alertAPIException(e, this)
    }
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
      mode: VCodeMode.RESET_PASSWORD
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


  destroyed() {
    this.intervals.forEach(window.clearInterval)
  }
}
</script>

<style scoped lang="scss">

  #s-fpwd-form {
    div {
      margin-bottom: 10px;
    }
  }

</style>
