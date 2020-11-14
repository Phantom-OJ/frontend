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
import 'codemirror/theme/idea.css'
import 'codemirror/theme/base16-dark.css'

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

  get s_options() {
    return {
      mode: this.mime,
      theme: 'idea',
      viewportMargin: Infinity,
      hintOptions: {
        completeSingle: false
      },
      ...this.options
    }
  }

  mounted() {

  }

  ready(codemirror:any){
    codemirror.on('cursorActivity',()=>codemirror.showHint())
    console.log(codemirror)
  }

}
</script>

<style lang="scss">
  @import "src/css/variable";

  .s-codemirror {
    min-height: $cm-height;

    .CodeMirror {
      .CodeMirror-scroll {
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
