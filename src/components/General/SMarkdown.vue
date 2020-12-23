<template>
  <div style="overflow: auto" class="lang-en">
    <vue-mathjax :formula="formula" :safe="false" class="s-markdown" :options="options"/>
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

  readonly options = {
    tex2jax: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
      processEscapes: true,
      processEnvironments: true
    }
  }

  get formula(): string {
    return this.$m2h(this.markdown)
    // return this.$xss(this.$m2h(this.markdown))
  }
}
</script>

<style lang="scss">
.s-markdown {

}
</style>
