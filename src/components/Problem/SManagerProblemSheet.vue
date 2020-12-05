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
        <v-radio-group v-model="problem_.status" :label="$t('create.status')" row >
          <v-radio v-for="_status in STATUS" :key="_status" :label="_status" :value="_status"/>
        </v-radio-group>

        <div class="s-flex s-mp-form--switch">
          <div>{{ $t('create.description') }}</div>
          <v-switch v-model="des_sol" color="info" style="margin: 0;align-items: center" hide-details/>
          <div>{{ $t('create.problem.solution') }}</div>
        </div>
        <v-select :label="$t('create.problem.type')" v-model="problem_.type" :items="TYPE"></v-select>
        <v-btn color="success" shaped>{{ $t('submit') }}</v-btn>
      </div>
      <div v-if="!des_sol" class="s-right s-flex">
        <v-textarea :label="$t('create.description')" color="primary" hide-details v-model="problem_.description"
                    class="s-mp-form--description inline-block" filled auto-grow height="706"/>
        <s-markdown :markdown="problem_.description" class="s-mp-form--description__show"/>
      </div>
      <div v-else class="s-right s-flex">
        <v-textarea :label="$t('create.problem.solution')" color="primary" hide-details v-model="problem_.solution"
                    class="s-mp-form--description inline-block" filled auto-grow height="706"/>
        <s-markdown :markdown="problem_.solution" class="s-mp-form--description__show"/>
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
  des_sol: boolean = false

}
</script>

<style lang="scss">
$mp-cm-height: 300px;
.s-mp-form {
  margin: 0 auto 10px;
  div.s-left {
    width: 30%;
    min-width: 380px;
    margin: 5px 12px 10px 16px;

    .s-mp-form--switch {
      margin-bottom: 16px;
      .v-input--switch__track,.v-input--selection-controls__ripple,.v-input--switch__thumb {
        color: var(--v-success-base);
      }
      .v-input--switch {
        padding: 0;
        margin: 0;
      }

      & > div:first-child {
        margin-right: 12px;
        color: rgba(0,0,0,0.6);
      }

      & > div:last-child {
        margin-left: 12px;
        color: rgba(0,0,0,0.6);
      }
    }

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
      margin-bottom: 12px;
      flex-grow: 0;
    }

    .v-input--selection-controls {
      margin-top: 6px;
    }

    > *:last-child {
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
