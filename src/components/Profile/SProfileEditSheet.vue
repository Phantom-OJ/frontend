<template>
  <div class="s-profile-edit">
    <div class="s-flex space-around" style="align-items: center">
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-avatar v-on="on" v-bind="attrs" :size="width_height.width/8+30" @click="$refs.uploadAvatar.click()"
                    style="margin: 24px 16px;">
            <img :src="avatarURL" :alt="user.nickname">
          </v-avatar>
        </template>
        {{ $t('profile.choose-avatar') }}
      </v-tooltip>
      <input v-show="false" type="file" accept="image/*" @change="avatarChange" ref="uploadAvatar">
      <v-btn color="success" @click="uploadAvatar" min-width="120" style="margin-bottom: 24px">
        {{ $t('upload') }}
      </v-btn>
    </div>
    <v-divider style="margin-bottom: 96px"/>
    <v-text-field :label="$t('profile.username')" readonly :value="user.username" disabled/>
    <v-text-field :label="$t('profile.nickname')" v-model="nickname"/>
    <v-switch v-model="stateSave" :label="$t('profile.recover')"/>
    <div class="s-flex space-between" style="align-items: center">
      <div class="s-flex" style="align-items: center;margin-bottom: 24px">
        <span style="padding: 2px 6px;margin-right: 12px">{{ $t('problem.lang') }}: </span>
        <v-btn-toggle v-model="defaultLangToggle" class="s-locale-box" mandatory shaped>
          <v-btn v-for="(locale,i) in locales" :key="locale" text :class="`lang-${$i18n.availableLocales[i]}`">
            {{ locale }}
          </v-btn>
        </v-btn-toggle>
      </div>
      <v-btn color="success" @click="submit" min-width="160" style="margin-bottom: 24px">
        {{ $t('submit') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {User} from "@/ts/user";
import {SUtil} from "@/ts/utils";
import {mapState} from "vuex";
import {Alert} from "@/ts/entities";

@Component({
  computed: mapState(['width_height'])
})
export default class SProfileEditSheet extends Vue {
  readonly keyInState = 'profile-edit'
  @Prop()
  readonly user!: User

  avatarURL: string = ''
  avatarFile?: File = undefined
  nickname: string = ''
  stateSave: boolean = false
  defaultLangToggle: number = 0
  lang: string = ''
  readonly width_height!: { width: number }

  created() {
    this.load()
  }

  load(){
    this.nickname = this.user.nickname
    this.stateSave = this.user.stateSave
    this.defaultLangToggle = this.$i18n.availableLocales.findIndex(u => u === this.user.lang)
    this.lang = this.user.lang
    this.avatarURL = this.user.avatar
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (stateKey === 'user') continue
        if (window.state[this.keyInState].hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
  }

  beforeDestroy() {
    window.state[this.keyInState] = {
      ...this.$data
    }
  }

  @Watch('defaultLangToggle', {immediate: true})
  changeLocale() {
    this.lang = this.$i18n.availableLocales[this.defaultLangToggle]
  }

  get locales() {
    const locales: Array<string> = this.$i18n.availableLocales.map(Map.prototype.get.bind(SUtil.localeMap))
    return locales
  }

  avatarChange(e: InputEvent) {
    let target: any = e.target
    this.avatarFile = target.files[0]
    if (!/image\/\w+/.test(this.avatarFile!.type)) {
      this.$alert(new Alert({type: 'error', info: this.$t('error.upload-img').toString()}));
      return;
    }
    let size: number = this.avatarFile!.size
    if (size > 5 * 1024 * 1024) {
      this.$alert(new Alert({type: 'warning', info: this.$t('error.t-large').toString()}));
      return;
    }
    this.avatarURL = window.URL.createObjectURL(this.avatarFile!);
  }

  async uploadAvatar() {
    const jsForm = new FormData()
    if (!this.avatarFile) this.$alert(new Alert({
      type: 'error',
      info: this.$t('error.upload-img').toString()
    }))
    jsForm.append('file', this.avatarFile!)
    const msg = await this.$api.uploadAvatar(jsForm)
    if (msg.toUpperCase().trim() === 'SUCCESS') {
      this.$alert(new Alert({
        type: 'success',
        info: this.$t('success.upload').toString()
      }))
    }
  }

  async submit() {
    const _user = await this.$api.modifyProfile({
      nickname: this.nickname,
      stateSave: this.stateSave,
      lang: this.lang
    })
    this.$store.commit('setUser',{user:_user, isAuthenticated:true})
    this.$i18n.locale = _user.lang
    this.$alert(new Alert({
      type: 'success',
      info: this.$t('success.submit').toString()
    }))
    this.load()
  }

}
</script>

<style scoped lang="scss">
.s-profile-edit {
  padding-top: 32px;
  margin: 0 auto;
  width: 40%;
  min-width: 240px;
}
</style>
