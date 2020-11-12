<template>
  <div>
    <vue-mathjax :formula="formula" :safe="false" class="s-markdown"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'

@Component({})
export default class SMarkdown extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly markdown!: string

  get formula(): string {
    return this.$xss(this.$m2h(this.markdown))
  }
}
</script>

<style lang="scss">
  .s-markdown {

  }
</style>
