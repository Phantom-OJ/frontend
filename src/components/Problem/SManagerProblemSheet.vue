<template>
  <v-sheet>
    <v-form class="s-mp-form s-flex">
      <div class="s-left">
        <v-text-field :label="$t('create.title')" color="primary" hide-details v-model="problem_.title"
                      class="s-mp-form--title"/>
        <v-text-field :label="$t('problem.score')" color="primary" hide-details v-model="problem_.fullScore"
                      class="s-mp-form--score" type="number"/>
        <div class="s-flex" style="justify-content: space-between">
          <v-text-field :label="$t('problem.time')" color="primary" hide-details v-model="problem_.timeLimit"
                        class="s-mp-form--time" type="number">
            <template v-slot:append-outer>
              <span>ms</span>
            </template>
          </v-text-field>
          <v-text-field :label="$t('problem.space')" color="primary" hide-details v-model="problem_.spaceLimit"
                        class="s-mp-form--space" type="number">
            <template v-slot:append-outer>
              <span>MB</span>
            </template>
          </v-text-field>
        </div>
        <v-radio-group v-model="problem_.status" :label="$t('create.status')" row>
          <v-radio v-for="_status in STATUS" :key="_status" :label="_status" :value="_status"/>
        </v-radio-group>
        <v-select :label="$t('create.problem.type')" v-model="problem_.type" :items="TYPE"></v-select>
        <label>{{$t('create.problem.solution')}}</label>
        <s-codemirror :code="problem_.solution" :mime="'text/x-sql'"/>
        <v-btn color="success" shaped>{{ $t('submit') }}</v-btn>
      </div>
      <div class="s-right s-flex">
        <v-textarea :label="$t('create.description')" color="primary" hide-details v-model="problem_.description"
                    class="s-mp-form--description inline-block" filled auto-grow height="706"/>
        <s-markdown :markdown="problem_.description" class="s-mp-form--description__show"/>
      </div>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, PropSync} from 'vue-property-decorator'
import {ProblemForm, STATUS, TYPE} from "@/ts/forms";
import SDateTimePicker from "@/components/General/SDateTimePicker.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";

@Component({
  components: {SCodemirror, SCodeEditor, SMarkdown, SDateTimePicker}
})
export default class SManagerProblemSheet extends Vue {
  readonly TYPE = TYPE.values()
  readonly STATUS = STATUS.values()
  @PropSync('problem')
  problem_!: ProblemForm


}
</script>

<style lang="scss">
$mp-cm-height:300px;
.s-mp-form {
  margin: 0 auto 10px;

  div.s-left {
    width: 30%;
    min-width: 380px;
    margin: 5px 12px 10px 16px;

    .s-codemirror {
      min-height: $mp-cm-height;
      .CodeMirror {
        .CodeMirror-scroll {
          min-height: $mp-cm-height;
        }
        min-height: $mp-cm-height;
      }
    }

    .s-mp-form--title {
      width: 100%;
      margin-bottom: 16px;
    }

    .s-mp-form--score {
      width: 100%;
      margin-bottom: 16px;
    }

    .s-mp-form--time {
      margin-right: 16px;
    }

    .s-mp-form--time, .s-mp-form--space {
      margin-bottom: 16px;
      flex-grow: 0;
    }

    .v-input--selection-controls {
      margin-top: 6px;
    }

    >*:last-child{
      margin-top: 15px;
    }
  }

  div.s-right {
    position: relative;
    width: 60%;
    flex-grow: 10;
    padding-left: 12px;

    .s-mp-form--description {
      width: 48%;
      flex-grow: 0;

      .v-input__slot {
        background-color: rgba(0, 0, 0, 0.03);
      }

      &::after {
        content: "";
        border-right: 1px solid rgba(0, 0, 0, 0.5);
        height: calc(100% + 1px);
        //width: 1px;
        position: absolute;
        right: 0;
      }
    }

    .s-mp-form--description__show {
      padding: 5px 10px;
      width: 48%;
    }
  }
}
</style>
