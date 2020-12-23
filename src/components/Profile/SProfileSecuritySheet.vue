<template>
  <div class="s-profile-security">
    <label>{{ $t('profile.modify-pwd') }}</label>
    <v-text-field v-model="oldPWD" type="password" color="secondary" style="margin-top: 12px"
                  :label="$t('profile.pwd')" @keyup.enter.native="submit"/>
    <s-set-password :password.sync="password" :confirmed.sync="confirmed" :pwd-label="$t('profile.n-pwd')"
                    :c-pwd-lable="$t('profile.c-pwd')" :wait-for-res="waitForSetPWD" @keyup.enter.native="submit"/>
    <v-btn block @click="submit" color="success">
      {{ $t('submit') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SSetPassword from "@/components/Profile/SSetPassword.vue";
import {Alert} from "@/ts/entities";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SSetPassword}
})
export default class SProfileSecuritySheet extends Vue {
  oldPWD: string = ''
  password: string = ''
  confirmed: boolean = false
  waitForSetPWD: boolean = false

  get uid() {
    return parseInt(this.$route.params.uid)
  }

  async submit() {
    if (!this.check()) return
    this.waitForSetPWD = true
    try {
      const msg = await this.$api.modifyPassword({
        newPassword: this.password,
        oldPassword: this.oldPWD
      })
      if (msg.toUpperCase().trim().includes('SUCCESS')) {
        this.$store.commit('setUser', {isAuthenticated: false})
        this.$alert(new Alert({
          type: 'success',
          info: msg
        }))
        await this.$router.push('/login')
      }
    } catch (e) {
      this.waitForSetPWD = false
      SUtil.alertAPIException(e, this)
    }
  }

  checkPassword(value: string) {
    return value.length >= 6 || this.$t('error.password')
  }

  check() {
    if (this.checkPassword(this.password) !== true) {
      this.$alert(new Alert({
        type: 'error',
        info: this.checkPassword(this.password).toString()
      }))
      return false
    }
    if (!this.confirmed) {
      this.$alert(new Alert({
        type: 'error',
        info: this.$t('error.confirm').toString()
      }))
      return false
    }
    return true
  }
}
</script>

<style scoped lang="scss">
.s-profile-security {
  padding-top: 32px;
  margin: 0 auto;
  width: 25%;
  min-width: 200px;
}

</style>
