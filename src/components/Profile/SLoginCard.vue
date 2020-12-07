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
    <v-dialog v-model="showDialog" width="400">
      <v-card max-width="600px" class="inline-block" style="margin: 0 auto;">
        <v-card-title>
          {{ $t('profile.recover') }}
        </v-card-title>
        <v-card-actions class="s-flex" style="justify-content: flex-end;padding:16px;padding-top: 8px">
          <v-btn @click="showDialog=false;recover=false;">
            {{ $t('cancel') }}
          </v-btn>
          <v-btn color="success" @click="showDialog=false;recover=true;">
            {{ $t('OK') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import router from "@/router";
import {SUtil} from "@/ts/utils";

@Component({})
export default class SLoginCard extends Vue {
  username: string = ''
  password: string = ''
  waitForRes: boolean = false
  showDialog: boolean = false
  recover: boolean = true

  async login() {
    this.waitForRes = true
    try {
      let user = await this.$api.login({
        username: this.username,
        password: this.password
      })
      this.$store.commit('setUser', {user: user, isAuthenticated: true})
      if (user.stateSave) {
        this.showDialog = true
        while (this.showDialog) {
          await SUtil.sleep(1000)
        }
        if (this.recover) {
          SUtil.recover(user.state, this)
        }
      }
      await router.push((this.$route.query['then'] ?? '/') as string)
    } catch (e) {
      this.waitForRes = false
      SUtil.alertAPIException(e, this)
    }
  }

  signUp() {
    this.$router.push({name: 'sign-up', query: this.$route.query})
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
