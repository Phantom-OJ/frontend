<template>
  <div>
    <v-text-field
      v-model="s_password"
      type="password"
      :label="pwdLabel"
      :disabled="waitForRes"
      :hint="levelText[passwordLevel]"
      :color="levelColor[passwordLevel]"
      :rules="[checkPassword]"
      validate-on-blur
    />
    <v-text-field
      v-model="confirmedPassword"
      type="password"
      :disabled="waitForRes"
      :label="cPwdLable"
      :rules="[checkPassword, confirm]"
      validate-on-blur
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";

@Component({})
export default class SSetPassword extends Vue {
  @PropSync('password')
  s_password!: string
  @PropSync('confirmed')
  s_confirmed!: boolean
  @Prop({
    type: String,
    required: true
  })
  readonly pwdLabel!: string
  @Prop({
    type: String,
    required: true
  })
  readonly cPwdLable!: string
  @Prop({
    type: Boolean,
    required: true
  })
  readonly waitForRes!: boolean
  readonly levelColor = SUtil.pLevelColor
  confirmedPassword: string = ''


  confirm(value: string) {
    return value === this.s_password || this.$t('error.confirm')
  }

  get levelText() {
    return SUtil.pLevelText.map(i => this.$t(i).toString())
  }

  get passwordLevel() {
    return SUtil.passwordLevel(this.s_password)
  }

  checkPassword(value: string) {
    return value.length >= 6 || this.$t('error.password')
  }
}
</script>

<style scoped lang="scss">
  div{
    margin-bottom: 10px!important;
  }
</style>
