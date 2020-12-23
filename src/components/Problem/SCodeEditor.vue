<template>
  <div class="s-editor">
    <v-toolbar class="elevation-0 s-flex" dense width="100%">
      <v-select :items="languages" v-model="s_lang" class="s-editor-lang" :disabled="disabled" height="40"
                dense color="secondary" :label="$t('problem.lang')" hide-details/>
      <v-spacer/>
      <s-tooltip-icon direction="top" icon-class="icon-color-0 mr12" :text="$t('problem.last-code')" :size="30"
                      @click="pull" :disabled="disabled">
        mdi-alpha-c-box
      </s-tooltip-icon>
      <s-tooltip-icon direction="top" icon-class="icon-color-0" :text="$t('problem.show-des')" :size="30"
                      @click="showDes" :disabled="disabled">
        {{ !flagShowDes ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
      </s-tooltip-icon>
      <v-btn @click="submit" color="secondary" :disabled="disabled" height="40" class="s-editor-submit">
        {{ $t('submit') }}
      </v-btn>
    </v-toolbar>
    <s-codemirror :code.sync="s_code" :mime="mime" :read-only="disabled?'nocursor':false" class="s-editor-body"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Emit, Prop, PropSync} from 'vue-property-decorator'
import SCodemirror from "@/components/General/SCodemirror.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import {SUtil} from "@/ts/utils";

@Component({
  components: {STooltipIcon, SCodemirror}
})
export default class SCodeEditor extends Vue {
  readonly languages = SUtil.languages
  @PropSync('lang')
  s_lang !: string
  @PropSync('code')
  s_code !: string
  @Prop({
    type: Boolean,
    default: false
  })
  readonly disabled!: boolean
  flagShowDes: boolean = false

  get mime(): string {
    return `text/x-${this.s_lang}`
  }

  @Emit()
  submit() {

  }

  @Emit()
  pull() {

  }

  @Emit()
  showDes() {
    this.flagShowDes = !this.flagShowDes
  }
}
</script>

<style lang="scss">
.mr12 {
  margin-right: 12px;
}

.s-editor {
  padding-top: 12px;
  flex-grow: 1;

  .s-flex {
    justify-content: space-between;
    margin-bottom: 6px;

    .v-toolbar__content {
      width: 100%;
      padding: 0;
    }

    .s-editor-lang {
      margin: 0 27px;
      width: 25%;
      flex-grow: 0;
      flex-shrink: 2;
    }

    .s-editor-submit {
      margin: 0 27px;
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
