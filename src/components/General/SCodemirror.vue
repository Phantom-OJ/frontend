<template>
  <div class="s-codemirror">
    <v-codemirror v-model="_code" :merge="false" name="skyland" :options="s_options" disabled="" @ready="ready"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/clike/clike'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/theme/cobalt.css'

@Component({})
export default class SCodemirror extends Vue {
  @PropSync('code')
  _code!: string

  @Prop({
    type: String,
    required: true
  })
  mime!: string

  @Prop({
    type: Boolean,
    default: false
  })
  readOnly!: boolean

  @Prop()
  options?: object

  @Prop({
    type: Set,
    default: () => new Set([` `, `\t`, ``, `*`, `(`, `)`, `'`, '`', `+`, `-`, `/`, `\\`])
  })
  notHint!: Set<string>

  get s_options() {
    return {
      mode: this.mime,
      readOnly: this.readOnly,
      theme: 'cobalt',
      viewportMargin: Infinity,
      hintOptions: {
        completeSingle: false
      },
      ...this.options
    }
  }

  ready(codemirror: any) {
    codemirror.on('change', (instance: any, {from, text}: { from: any, text: Array<string> }) => {
      const hintsList = codemirror.getHelpers(codemirror, 'hint')[0](codemirror).list
      if (!!text && hintsList.length >= 1 && hintsList[0].text !== text[0] && !this.notHint.has(text[0])) {
        codemirror.showHint()
        console.log(text[0])
      }
    })
  }

}
</script>

<style lang="scss">
  @import "src/css/variable";

  .s-codemirror {
    min-height: $cm-height;

    .CodeMirror {
      .CodeMirror-scroll {
        background-color: rgba(0, 0, 0, 0.03);
        /*background-color: var(--v-secondary-lighten5);*/
        min-height: $cm-height;

        &:hover {
          cursor: text;
        }
      }

      height: auto;
      min-height: $cm-height;
    }
  }
</style>
