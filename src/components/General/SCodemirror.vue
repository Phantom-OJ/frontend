<template>
  <div class="s-codemirror">
    <v-codemirror v-model="_code" :merge="false" name="skyland" :options="s_options"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/base16-dark.css'

@Component({})
export default class SCodemirror extends Vue {
  @PropSync('code')
  _code!: string

  @Prop({
    type:String,
    required:true
  })
  mime!:string

  @Prop()
  options?:object

  s_options={
    mode:this.mime,
    theme:'idea',
    viewportMargin:Infinity,
    ...this.options
  }

  mounted(){

  }

}
</script>

<style lang="scss">

  .s-codemirror{
    border: 1px solid var(--v-accent-darken1);
    border-radius: 10px;
    min-height: 600px;
    .CodeMirror{
      border-radius: 10px;
      .CodeMirror-scroll{
        min-height: 600px;
        &:hover{
          cursor: text;
        }
      }
      height: auto;
      min-height: 600px;
    }
  }
</style>
