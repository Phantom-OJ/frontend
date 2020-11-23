<template>
  <v-card id="root">
    <v-card-title id="title">
      {{$t('nav-user.login')}}
    </v-card-title>
    <v-form id="form">
      <div id="name">
        <v-text-field
          v-model="username"
          :label="$t('profile.mail')"
        >
        </v-text-field>
      </div>
      <div id="pwd">
        <v-text-field
          v-model="password"
          type="password"
          :label="$t('profile.pwd')"
        >
        </v-text-field>
      </div>
      <div id="submit">
        <v-btn
          id="submit-btn"
          color="rgb(92,187,246)"
          @click="login"
          :loading="loading"
        >
        {{$t('submit')}}
        </v-btn>
      </div>
      <div id="sign-up">
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
import {Alert} from "@/ts/entries";

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
  #root {
    margin: 20px auto;
    padding-bottom: 15px;
    width: 400px;
    max-width: 80%;
  }

  #form {
    margin: 10px 20px;
  }

  #pwd {
    height: 70px;
    margin: 10px 0;
  }

  #submit-btn, #sign-up-btn{
    display: block;
    width: 100%;
    margin: 20px auto;
  }

  #sign-up{
    margin-bottom: 20px;
  }
</style>
