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
            :rules="mailRules"
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
          ></v-text-field>
        </div>
        <div id="c-pwd">
          <v-text-field
            v-model="confirmedPassword"
            type="password"
            :label="$t('profile.c-pwd')"
            @blur="confirm"
            @focus="confirmError = false"
          ></v-text-field>
          <span id="c-pwd-error" v-if="confirmError">{{$t('error.confirm')}}</span>
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
import {Component, Vue} from 'vue-property-decorator'
import {SignUpForm} from "@/ts/DataDef";

@Component({})
export default class SSignUpCard extends Vue {
  username: string=''
  password: string=''
  nickname: string = ''
  confirmedPassword: string=''
  loading: boolean=false
  vCode: string=''
  confirmError: boolean=false
  mailRules=[(value:string)=>/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-]+)+$/.test(value)||'Format incorrect']

  confirm(){
    if(this.password!==this.confirmedPassword){
      this.confirmError = true
    }
  }

  async signUp(){
    this.loading = true
    try {
      await this.$store.dispatch('signUp', {
        signForm: {
          username: this.username,
          password: this.password,
          nickname: this.nickname
        } as SignUpForm,
        then: this.$route.query['then']
      })
    }catch (e) {
      this.loading = false
      window.alert(e)
    }
  }
}
</script>

<style scoped lang="scss">
  #root{
    width: 400px;
    max-width: 80%;
    margin: 20px auto;
  }

  #c-pwd-error{
    color: #e52f2f;
    display: inline-block;
    margin-bottom: 10px;
  }

  #v-code-send{
    margin-left: 5%;
    display: inline-block;
    width: 35%;
  }

  #submit-btn{
    display: block;
    width: 100%;
    margin: 10px auto;
  }

  #form{
    div{
      margin-bottom: 10px;
    }
  }
</style>
