<template>
  <v-dialog persistent v-model="flagDialog" max-width="320">
    <v-card>
      <v-card-title>
        {{ $t('confirm') }}
      </v-card-title>
      <v-card-text>
        {{ content }}
      </v-card-text>
      <v-card-actions style="margin: 16px; display: flex;justify-content: flex-end;padding-bottom: 16px;">
        <v-btn color="success" @click="yes">
          {{ $t('OK') }}
        </v-btn>
        <v-btn color="accent" @click="no">
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

  result: Promise<boolean> = new Promise<boolean>(resolve1 => void 0)
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
