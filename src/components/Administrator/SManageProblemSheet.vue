<template>
  <s-loading v-if="loading" class="s-card-loading"/>
  <v-sheet v-else>
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
            <v-card-title style="padding-bottom: 0">{{ $t('select.tag') }}</v-card-title>
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
              <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="jpShow=j">
                mdi-pencil
              </v-icon>
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
        <v-btn v-if="!this.isCreate" @click="submit" color="success" style="margin-top: 16px">{{ $t('submit') }}</v-btn>

        <v-dialog v-if="jpDialog" v-model="jpDialog">
          <v-card style="padding: 36px 24px 36px 24px">
            <s-manage-judge-point-sheet :judge-point.sync="jpShow" :is-create="isCreate"/>
            <v-btn v-if="!isCreate" absolute top right @click="submitJP" color="warning">
              {{ $t('submit') }}
            </v-btn>
            <v-btn v-else absolute text top right @click="jpDialog=false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card>
        </v-dialog>
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
import {Alert, Tag} from "@/ts/entities";
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import STag from "@/components/General/STag.vue";
import SManageJudgePointSheet from "@/components/Administrator/SManageJudgePointSheet.vue";
import {mapState} from "vuex";
import {Permission, User} from "@/ts/user";
import {SUtil} from "@/ts/utils";
import SLoading from "@/components/General/SLoading.vue";

@Component({
  components: {
    SLoading,
    SManageJudgePointSheet, STag, SSplitSelect, SCodemirror, SCodeEditor, SMarkdown, SDateTimePicker
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

  loading:boolean = false
  des_sol: boolean = false
  activeTags: Tag[] = []
  activeTF: string = ''
  inactiveTags: Tag[] = []
  inactiveTF: string = ''
  tagDialog: boolean = false
  jpDialog: boolean = false
  jpShow_: JudgePointForm = {} as JudgePointForm

  get jpShow() {
    return this.jpShow_
  }

  set jpShow(v: JudgePointForm) {
    if (!this.isCreate) {
      this.$alert(new Alert({
        type: 'warning',
        info: this.$t('warning.extra-submit').toString()
      }))
    }
    this.jpShow_ = v
    this.jpDialog = true
  }

  @Watch('activeTags')
  setTagList() {
    this.problem_.tagList = this.activeTags.map(e => e.ID)
  }

  created() {
    this.init()
  }

  async init() {
    this.loading = true
    await Promise.all([this.loadScripts(), this.loadDBs(), this.loadTags()])
    if (this.isCreate) {
      this.inactiveTags.push(...this.tags)
    } else {
      this.problemChanged()
    }
    this.loading = false
  }

  @Watch('problem_.id')
  problemChanged() {
    if (!this.problem_||!this.problem_.id) return
    if ((this.problem_.id ?? -1) > 0 && !this.isCreate) {
      this.activeTags = this.problem_.tagList.map(id => this.tags.find(j => id === j.ID)!)
      this.inactiveTags = SUtil.differenceByID(this.tags, this.activeTags)
    }
  }

  async loadScripts() {
    return this.$store.dispatch('loadScripts')
  }

  async loadDBs() {
    return this.$store.dispatch('loadDBs')
  }

  async loadTags() {
    return this.$store.dispatch('loadTags')
  }

  get activeTagNames() {
    return this.activeTags.map(t => t.keyword).join(' ')
  }

  async submitJP() {
    if (this.jpShow.id > 0) { // modify
      const msg = await this.$api.modifyJudgePoint(this.jpShow.id, this.jpShow)
      SUtil.alertIfSuccess(msg, 'success.submit', this)
      this.$emit('refresh')
    } else { // add
      const msg = await this.$api.addJudgePoint(this.problem_.id, this.jpShow)
      SUtil.alertIfSuccess(msg, 'success.upload', this)
      this.$emit('refresh')
    }
  }

  async deleteJ(j: JudgePointForm) {
    if (this.isCreate) {
      this.problem_.judgePointList.remove(j)
    } else {
      const msg = await this.$api.deleteJudgePoint(this.jpShow.id)
      SUtil.alertIfSuccess(msg, 'success.delete', this)
      this.$emit('refresh')
    }
  }

  addJ() {
    this.problem_.judgePointList.push({
      id: -1,
      dialect: 'pgsql',
      beforeSql: '',
      afterSql: '',
      judgeScriptId: 1,
      answer: '',
      judgeDatabaseId: 1
    })
    if (!this.isCreate) {
      this.jpShow = this.problem_.judgePointList[this.problem_.judgePointList.length - 1]
    }
  }

  get permitSolution() {
    return this.user.hasPermission(Permission.ALLOWANCE.PROVIDE_THE_SOLUTION)
  }

  async submit() {
    const msg = await this.$api.modifyProblem(this.problem_.id, this.problem_)
    SUtil.alertIfSuccess(msg, 'success.submit', this)
    this.$emit('refresh')
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
