<template>
  <v-card class="account-card">
    <v-card-title>
      {{ $t('nav-user.login') }}
    </v-card-title>
    <v-form id="s-login-form">
      <div id="s-login-name">
        <v-text-field
          v-model="username"
          :label="$t('profile.mail')"
          autocomplete
        >
        </v-text-field>
      </div>
      <div id="s-login-pwd">
        <v-text-field
          v-model="password"
          type="password"
          :label="$t('profile.pwd')"
          hide-details
          name="password"
          autocomplete
          @keydown.enter.native="login"
        >
        </v-text-field>
      </div>
      <div id="s-forget-pwd">
        <a class="s-link" v-text="$t('profile.f-pwd')" @click="$router.push('/forget-pwd')"/>
      </div>
      <div id="s-login-submit">
        <v-btn
          class="s-submit-btn"
          color="primary"
          @click="login"
          :loading="waitForRes"
        >
          {{ $t('nav-user.login') }}
        </v-btn>
      </div>
      <div id="s-login-sign-up">
        <v-btn
          class="s-submit-btn"
          color="success"
          @click="signUp"
          :disabled="waitForRes"
        >
          {{ $t('nav-user.sign-up') }}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Watch} from 'vue-property-decorator'
import router from "@/router";
import {SUtil} from "@/ts/utils";

@Component({})
export default class SLoginCard extends Vue {
  username: string = ''
  password: string = ''
  waitForRes: boolean = false

  async login() {
    this.waitForRes = true
    try {
      let user = await this.$api.login({
        username: this.username,
        password: this.password
      })
      this.$store.commit('setUser', {user: user, isAuthenticated: true})
      this.$i18n.locale = user.lang
      let leave = sessionStorage.getItem('leave')
      console.log(parseInt(user.state.time), parseInt(leave!))
      if (user.stateSave && ((!!leave && parseInt(user.state.time) >= parseInt(leave)) || !leave)) {
        SUtil.recover(user.state, this)
      }
      if (this.$route.query['then'].toString().includes('/login')) {
        await this.$router.push('/')
      } else {
        await this.$router.push(this.$route.query['then'].toString() ?? '/')
      }
    } catch (e) {
      this.waitForRes = false
      SUtil.alertAPIException(e, this)
    }
  }

  signUp() {
    this.$router.push({name: 'sign-up', query: this.$route.query})
  }

  @Watch('$store.state.isAuthenticated', {immediate: true})
  authenticatedChange() {
    if (!this.waitForRes && this.$store.state.isAuthenticated) {
      router.replace((this.$route.query['then'] ?? '/') as string)
    }
  }

}
</script>

<style scoped lang="scss">

#s-login-form {
  margin: 10px 20px;
}

#s-login-pwd {
  height: 70px;
  margin-top: 10px;
}

#s-login-sign-up {
  margin-bottom: 20px;
}

#s-forget-pwd {
  text-align: right;
}
</style>
