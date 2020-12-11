<template>
  <v-sheet>
    <v-form class="s-mp-form s-flex">
      <div class="s-left">
        <v-text-field :label="$t('create.title')" color="primary" hide-details v-model="problem_.title"
                      class="s-mp-form--title"/>
        <v-text-field :label="$t('problem.score')" color="primary" hide-details v-model="problem_.fullScore"
                      class="s-mp-form--score" type="number"/>
        <div class="s-flex space-between">
          <v-text-field :label="$t('problem.time')" color="primary" hide-details v-model="problem_.timeLimit"
                        class="s-mp-form--time" type="number">
            <template v-slot:append-outer>
              <span>ms</span>
            </template>
          </v-text-field>
          <v-text-field :label="$t('problem.memory')" color="primary" hide-details v-model="problem_.spaceLimit"
                        class="s-mp-form--space" type="number">
            <template v-slot:append-outer>
              <span>MB</span>
            </template>
          </v-text-field>
        </div>
        <div class="s-flex padding-t-6 space-between">
          <v-radio-group v-model="problem_.status" :label="$t('create.status')" row hide-details
                         style="padding-bottom: 12px">
            <v-radio v-for="_status in STATUS" :key="_status" :label="_status" :value="_status"/>
          </v-radio-group>
          <div class="s-flex s-mp-form--switch">
            <div>{{ $t('create.description') }}</div>
            <v-switch v-model="des_sol" color="info" style="margin: 0;align-items: center" hide-details/>
            <div>{{ $t('create.problem.solution') }}</div>
          </div>
        </div>
        <v-dialog v-model="tagDialog" max-width="1200">
          <template v-slot:activator="{on, attrs}">
            <v-text-field readonly v-on="on" v-bind="attrs" :value="activeTagNames" :label="$t('problem.tag')"/>
          </template>
          <s-split-select :active.sync="activeTags" :inactive.sync="inactiveTags" :active-filter="activeTF"
                          :inactive-filter="inactiveTF" :filter="(e, f)=>e.description.includes(f)"
                          @close="tagDialog=false">
            <template v-slot:aSearch>
              <v-text-field :label="$t('search')" hide-details style="padding-bottom: 12px" v-model="activeTF"/>
            </template>
            <template v-slot:active="{entity}">
              <s-tag
                :tag="entity"
                :stop-click-propagate="false"
              ></s-tag>
            </template>
            <template v-slot:iSearch>
              <v-text-field :label="$t('search')" hide-details style="padding-bottom: 12px" v-model="inactiveTF"/>
            </template>
            <template v-slot:inactive="{entity}">
              <s-tag
                :tag="entity"
                :stop-click-propagate="false"
              ></s-tag>
            </template>
            <v-card-title style="padding-bottom: 0">{{$t('select.tag')}}</v-card-title>
          </s-split-select>
        </v-dialog>
        <v-select :label="$t('create.problem.type')" v-model="problem_.type" :items="TYPE"></v-select>
        <v-simple-table class="relative" style="margin-bottom: 76px">
          <thead>
          <tr>
            <th>{{ $t('No') }}</th>
            <th>{{ $t('create.judge-point.script') }}</th>
            <th>{{ $t('create.judge-point.db') }}</th>
            <th>{{ $t('problem.lang') }}</th>
            <th>{{ $t('create.operation') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(j,index) in problem_.judgePointList" :key="index">
            <th>{{ index }}</th>
            <th>{{ j.judgeScriptId }}</th>
            <th>{{ j.judgeDatabaseId }}</th>
            <th>{{ j.dialect }}</th>
            <th>
              <v-dialog v-model="jpDialog">
                <template v-slot:activator="{on, attrs}">
                  <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" v-on="on" v-bind="attrs">
                    mdi-pencil
                  </v-icon>
                </template>
                <v-card style="padding: 36px 24px 36px 24px">
                  <s-manage-judge-point-sheet :judge-point.sync="j" :is-create="isCreate"/>
                  <v-btn absolute text top right @click="jpDialog=false">
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-card>
              </v-dialog>
              <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="deleteJ(j)">
                mdi-delete
              </v-icon>
            </th>
          </tr>
          </tbody>
          <v-btn fab absolute @click="addJ" class="s-add-btn" color="secondary">
            <v-icon>
              mdi-plus-thick
            </v-icon>
          </v-btn>
        </v-simple-table>
      </div>
      <div v-if="!des_sol" class="s-right s-flex">
        <v-textarea :label="$t('create.description')" color="primary" hide-details v-model="problem_.description"
                    class="s-mp-form--description inline-block" filled auto-grow/>
        <s-markdown :markdown="problem_.description" class="s-mp-form--description__show"/>
      </div>
      <div v-else class="s-right s-flex">
        <v-textarea :label="$t('create.problem.solution')" color="primary" hide-details v-model="problem_.solution"
                    class="s-mp-form--description inline-block" filled auto-grow height="706"
                    :disabled="!permitSolution"/>
        <s-markdown :markdown="problem_.solution" class="s-mp-form--description__show"/>
      </div>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync, Watch} from 'vue-property-decorator'
import {JudgePointForm, ProblemForm, STATUS, TYPE} from "@/ts/forms";
import SDateTimePicker from "@/components/General/SDateTimePicker.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {Tag} from "@/ts/entities";
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import STag from "@/components/General/STag.vue";
import SUploadFileForm from "@/components/General/SUploadFileForm.vue";
import SManageJudgePointSheet from "@/components/Problem/SManageJudgePointSheet.vue";
import {mapState} from "vuex";
import {Permission, User} from "@/ts/user";
import {SUtil} from "@/ts/utils";

@Component({
  components: {
    SManageJudgePointSheet,
    SUploadFileForm, STag, SSplitSelect, SCodemirror, SCodeEditor, SMarkdown, SDateTimePicker
  },
  computed: mapState(['user', 'tags'])
})
export default class SManagerProblemSheet extends Vue {
  readonly TYPE = TYPE.values()
  readonly STATUS = STATUS.values()
  readonly user!: User
  readonly tags!: Tag[]
  @PropSync('problem')
  problem_!: ProblemForm
  @Prop({type: Boolean, required: true})
  isCreate!: boolean

  des_sol: boolean = false
  activeTags: Tag[] = []
  activeTF: string = ''
  inactiveTags: Tag[] = []
  inactiveTF: string = ''
  tagDialog: boolean = false
  jpDialog: boolean = false

  created() {
    this.init()
  }

  async init() {
    await Promise.all([this.loadScripts(), this.loadDBs(), this.loadTags()])
    if (this.isCreate) {
      this.inactiveTags.push(...this.tags)
    } else {
      this.problemChanged()
    }

  }

  @Watch('problem_.id')
  problemChanged() {
    if ((this.problem_.id ?? -1) > 0 && !this.isCreate) {
      this.activeTags = this.problem_.tagList.map(id => this.tags.find(j => id === j.ID)!)
      this.inactiveTags = SUtil.differenceByID(this.tags, this.activeTags)
    }
  }

  async loadScripts() {
    return this.$store.dispatch('loadScripts', {vue: this})
  }

  async loadDBs() {
    return this.$store.dispatch('loadDBs', {vue: this})
  }

  async loadTags() {
    return this.$store.dispatch('loadTags', {vue: this})
  }

  get activeTagNames() {
    return this.activeTags.map(t => t.keyword).join(' ')
  }

  deleteJ(j: JudgePointForm) {
    this.problem_.judgePointList.remove(j)
  }

  addJ() {
    this.problem_.judgePointList.push({
      dialect:'pgsql',
      beforeSql: '',
      afterSql: '',
      judgeScriptId: 1,
      answer: '',
      judgeDatabaseId: 1
    })
  }

  async upload() {
    const form = this.$refs.uploadForm as HTMLFormElement
    const jsForm = new FormData(form)
    console.log(jsForm.get('file'))
    // console.log(await this.$api.uploadJudgeScript(jsForm))
  }

  get permitSolution() {
    return this.user.hasPermission(Permission.ALLOWANCE.PROVIDE_THE_SOLUTION)
  }
}
</script>

<style lang="scss">
$mp-cm-height: 300px;
.s-mp-form {
  margin: 0 auto 10px;

  div.s-left {
    width: 30%;
    min-width: 360px;
    padding: 5px 12px 10px 16px;
    box-sizing: border-box;
    flex-grow: 100;

    .s-mp-form--switch {
      padding-bottom: 12px;

      .v-input--switch__track, .v-input--selection-controls__ripple, .v-input--switch__thumb {
        color: var(--v-success-base);
      }

      .v-input--switch {
        padding: 0;
        margin: 0;
      }

      & > div:first-child {
        margin-right: 6px;
        color: rgba(0, 0, 0, 0.6);
      }

      & > div:last-child {
        margin-left: 6px;
        color: rgba(0, 0, 0, 0.6);
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
      width: 160px;
    }

    .v-input--selection-controls {
      margin-top: 6px;
    }

    > *:last-child {
      margin-top: 15px;
    }

    .v-input--radio-group {
      margin-top: 0;
      padding-top: 0;
    }
  }

  div.s-right {
    position: relative;
    width: 65%;
    flex-grow: 1;
    box-sizing: border-box;
    min-height: 705px;

    .s-mp-form--description {
      width: 50%;
      flex-grow: 1;
      height: 100%;

      .v-input__control {
        height: 100%;
      }

      .v-input__slot {
        height: 100%;
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
      width: 50%;
      flex-grow: 1;
    }
  }
}
</style>
<style scoped lang="scss">
button.v-btn.s-add-btn {
  right: 10px;
  width: 60px;
  height: 60px;
  bottom: -70px;
}
</style>
