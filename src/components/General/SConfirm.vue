<template>
  <v-dialog persistent v-model="flagDialog" max-width="320" @keydown.enter="yes">
    <v-card>
      <v-card-title>
        {{ $t('confirm') }}
      </v-card-title>
      <v-card-text>
        {{ content }}
      </v-card-text>
      <v-card-actions style="margin: 16px 16px 0 0; display: flex;justify-content: flex-end;">
        <v-btn color="success" @click="yes" style="margin-bottom: 16px" autofocus>
          {{ $t('OK') }}
        </v-btn>
        <v-btn color="accent" @click="no" style="margin-bottom: 16px">
          {{ $t('cancel') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'

@Component({})
export default class SConfirm extends Vue {

  result: Promise<boolean> = new Promise<boolean>(() => void 0)
  resolve: (value: boolean) => void = () => void 0
  flagDialog: boolean = false
  content: string = ''

  async confirm(content: string): Promise<boolean> {
    this.content = content
    this.result = new Promise<boolean>(resolve => this.resolve = resolve)
    this.flagDialog = true
    return this.result
  }

  yes() {
    this.resolve(true)
    this.flagDialog = false
  }

  no() {
    this.resolve(false)
    this.flagDialog = false
  }
}
</script>

<style scoped lang="scss">

</style>
