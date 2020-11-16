<template>
  <div class="s-editor">
    <div class="s-flex">
      <span class="s-editor-title">{{$t('problem.code-editor')}}</span>
      <v-select :items="languages" v-model="s_lang" class="s-editor-lang" :disabled="disabled" height="40"
                dense color="secondary" :label="$t('problem.lang')"></v-select>
      <slot/>
      <v-btn @click="submit" color="secondary" :disabled="disabled" height="40" class="s-editor-submit">
        {{$t('submit')}}
      </v-btn>
    </div>
    <s-codemirror :code.sync="s_code" :mime="mime" :read-only="disabled" class="s-editor-body"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Emit, Prop, PropSync} from 'vue-property-decorator'
import SCodemirror from "@/components/General/SCodemirror.vue";

@Component({
  components: {SCodemirror}
})
export default class SCodeEditor extends Vue {
  readonly languages = ['pgsql', 'sqlite', 'mysql']
  @PropSync('lang')
  s_lang !: string
  @PropSync('code')
  s_code !: string
  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean

  get mime():string{
    return `text/x-${this.s_lang}`
  }

  @Emit()
  submit() {

  }
}
</script>

<style lang="scss">
  .s-editor {
    padding-top: 16px;
    .s-flex {
      justify-content: space-between;
      .s-editor-title{
        flex-grow: 1;
        padding: 0 0 0 32px;
        line-height: 40px;
        font-weight: 700;
        font-size: 20px;
      }
      .s-editor-lang {
        margin: 0 2%;
        width: 25%;
        flex-grow: 0;
        flex-shrink: 2;
      }

      .s-editor-submit{
        margin: 0 2%;
        width: 20%;
        flex-grow: 0;
        flex-shrink: 1;
      }
    }
    .s-editor-body {
      /*padding: 16px 16px 0 16px;*/
      padding: 0 27px 27px 27px;
      border-radius: 10px;
      /*border: 1px solid var(--v-secondary-darken2);*/
    }
  }
</style>
