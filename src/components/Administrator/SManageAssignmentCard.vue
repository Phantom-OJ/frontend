<template>
  <v-card class="top-tabs-card">
    <v-sheet class="s-top-tabs">
      <v-tabs :height="40" v-model="tab">
        <v-tab>
          {{ $t('create.description') }}
        </v-tab>
        <v-tab
          v-for="problem in assignment.uploadProblemFormList"
          :key="problem.indexInAssignment"
        >
          {{ `${$t('create.problem.&')}. ${problem.indexInAssignment}` }}
        </v-tab>
      </v-tabs>
    </v-sheet>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-form class="s-ca-form s-flex">
          <div class="s-left">
            <v-text-field :label="$t('create.title')" color="primary" hide-details v-model="assignment.title"
                          class="s-ca-form--title"/>
            <div class="s-flex" style="justify-content: space-between">
              <s-date-time-picker :date.sync="startDate" :time.sync="startTime" s-class="s-ca-form--start-time"
                                  :label="$t('create.start-time')"/>
              <s-date-time-picker :date.sync="endDate" :time.sync="endTime" s-class="s-ca-form--end-time"
                                  :label="$t('create.end-time')"/>
            </div>
            <v-text-field :label="$t('problem.score')" v-model="assignment.fullScore"/>
            <v-dialog v-model="groupDialog" max-width="1200">
              <template v-slot:activator="{on, attrs}">
                <v-text-field readonly v-on="on" v-bind="attrs" :value="activeGroupNames" :label="$t('profile.group')"/>
              </template>
              <s-split-select :active.sync="activeGroups" :inactive.sync="inactiveGroups" :active-filter="activeGF"
                              :filter="(e, f)=>e.description.includes(f)" @close="groupDialog=false"
                              :inactive-filter="inactiveGF">
                <template v-slot:aSearch>
                  <v-text-field :label="$t('search')" v-model="activeGF" hide-details style="padding-bottom: 12px"/>
                </template>
                <template v-slot:active="{entity}">
                  <v-chip label color="info">
                    <v-icon left>mdi-account-multiple</v-icon>
                    {{ entity.description }}
                  </v-chip>
                </template>
                <template v-slot:iSearch>
                  <v-text-field :label="$t('search')" v-model="inactiveGF" hide-details style="padding-bottom: 12px"/>
                </template>
                <template v-slot:inactive="{entity}">
                  <v-chip label color="info">
                    <v-icon left>mdi-account-multiple</v-icon>
                    {{ entity.description }}
                  </v-chip>
                </template>
                <v-card-title style="padding-bottom: 0">{{ $t('select.group') }}</v-card-title>
              </s-split-select>
            </v-dialog>
            <v-radio-group v-model="assignment.status" :label="$t('create.status')" row>
              <v-radio v-for="_status in STATUS" :key="_status" :label="_status" :value="_status"/>
            </v-radio-group>
            <v-simple-table class="relative" style="margin-bottom: 76px">
              <thead>
              <tr>
                <th>{{ $t('No') }}</th>
                <th>{{ $t('create.problem.&') }}</th>
                <th>{{ $t('problem.score') }}</th>
                <th>{{ $t('create.status') }}</th>
                <th>{{ $t('create.operation') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="p in assignment.uploadProblemFormList" :key="p.indexInAssignment">
                <th>{{ p.indexInAssignment }}</th>
                <th>{{ p.title }}</th>
                <th>{{ p.fullScore }}</th>
                <th>{{ p.status }}</th>
                <th v-if="isCreate">
                  <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="upProb(p)">
                    mdi-arrow-up-bold
                  </v-icon>
                  <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="editProb(p)">
                    mdi-pencil
                  </v-icon>
                  <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="deleteProb(p)">
                    mdi-delete
                  </v-icon>
                </th>
                <th v-else>
                  <v-icon class="icon-color-1 cursor-hand-hover table-icon" size="20" @click="editProb(p)">
                    mdi-pencil
                  </v-icon>
                </th>
              </tr>
              </tbody>
              <v-btn v-if="isCreate" fab absolute @click="addProblem" class="s-add-btn" color="secondary">
                <v-icon>
                  mdi-plus-thick
                </v-icon>
              </v-btn>
            </v-simple-table>
            <v-btn color="success" shaped @click="submit">{{ $t('submit') }}</v-btn>
          </div>
          <div class="s-right s-flex">
            <v-textarea :label="$t('create.description')" color="primary" hide-details v-model="assignment.description"
                        class="s-ca-form--description inline-block" filled auto-grow/>
            <s-markdown :markdown="assignment.description" class="s-ca-form--description__show"/>
          </div>
        </v-form>
      </v-tab-item>
      <v-tab-item
        v-for="problem in assignment.uploadProblemFormList"
        :key="problem.indexInAssignment"
      >
        <s-manager-problem-sheet :problem.sync="problem" :is-create="isCreate"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Watch} from 'vue-property-decorator'
import SDateTimePicker from "@/components/General/SDateTimePicker.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {AssignmentForm, ProblemForm, STATUS} from "@/ts/forms";
import {Group} from "@/ts/user";
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import SManagerProblemSheet from "@/components/Administrator/SManageProblemSheet.vue";
import {mapState} from "vuex";
import {SUtil} from "@/ts/utils";

@Component({
  components: {SManagerProblemSheet, SSplitSelect, SMarkdown, SDateTimePicker},
  computed: {...mapState(['groups'])}
})
export default class SManageAssignmentCard extends Vue {
  readonly STATUS = STATUS.values()
  readonly defaultMd = '# markdown supported\n\n$$\nembedded\\;latex\\;supported\n$$'
  readonly keyInState = 'create-assignment'
  readonly groups!: Group[]

  assignment: AssignmentForm = {
    id: -1,
    title: '',
    description: this.defaultMd,
    startTime: 0,
    endTime: 0,
    status: 'public',
    fullScore: 100,
    uploadProblemFormList: [],
    groupList: []
  }

  pI = 1
  groupDialog: boolean = false
  tab: number = 0
  startDate: string = new Date().toISOString().substring(0, 10)
  startTime: string = '00:00'
  endDate: string = new Date().toISOString().substring(0, 10)
  endTime: string = '00:00'

  activeGroups: Group[] = []
  activeGF: string = ''
  inactiveGroups: Group[] = []
  inactiveGF: string = ''

  @Watch('activeGroups', {immediate: true})
  setGroupList() {
    this.assignment.groupList = this.activeGroups.map(e => e.ID)
  }

  async submit() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    if(this.isCreate) {
      const msg = await this.$api.putAssignment({
        ...this.assignment,
        startTime: new Date(`${this.startDate} ${this.startTime}`).getTime(),
        endTime: new Date(`${this.endDate} ${this.endTime}`).getTime()
      })
      SUtil.alertIfSuccess(msg, 'success.upload', this)
    }else{
      // const msg = await this.$api.modifyAssignment(this.aid,{
      //
      // })
    }
  }

  async created() {
    await this.$store.dispatch('loadGroups')
    if (this.isCreate) {
      this.inactiveGroups.push(...this.groups)
    } else {
      await this.loadAssignment()
    }
  }

  async loadAssignment() {
    // this.assignment
    // this.activeGroups = await this.$api.queryActiveGroups(this.aid) TODO
    this.inactiveGroups = SUtil.differenceByID(this.groups, this.activeGroups)
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (window.state[this.keyInState].hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
  }

  beforeDestroy() {
    window.state[this.keyInState] = {
      ...this.$data
    }
  }

  get aid() {
    return parseInt(this.$route.params.aid)
  }

  get isCreate() {
    return !(this.aid > 0)
  }

  get activeGroupList() {
    return this.activeGroups.map(g => g.ID)
  }

  get activeGroupNames() {
    return this.activeGroups.map(g => g.description).join(' ')
  }

  addProblem() {
    this.assignment.uploadProblemFormList.push({
      id: -1,
      title: `${this.pI++}`,
      description: this.defaultMd,
      status: 'public',
      solution: '',
      spaceLimit: 64,
      timeLimit: 3000,
      fullScore: 20,
      indexInAssignment: this.assignment.uploadProblemFormList.length + 1,
      type: 'SELECT',
      tagList: [0],
      judgePointList: []
    })
  }

  sortProblems() {
    this.assignment.uploadProblemFormList.sort((e1, e2) => e1.indexInAssignment - e2.indexInAssignment)
  }

  upProb(p: ProblemForm) {
    const idx = p.indexInAssignment
    if (idx === 1) return
    this.assignment.uploadProblemFormList[idx].indexInAssignment--
    this.assignment.uploadProblemFormList[idx - 1].indexInAssignment++
    this.sortProblems()
  }

  editProb(prob: ProblemForm) {
    if (this.isCreate) {
      this.tab = prob.indexInAssignment
    } else if (window.confirm(this.$t('create.leave').toString())) {
      this.$router.push(`/modify/problem/${prob.id}`)
    }
  }

  deleteProb(prob: ProblemForm) {
    const idx = prob.indexInAssignment
    this.assignment.uploadProblemFormList = this.assignment.uploadProblemFormList.filter(p => p.indexInAssignment !== idx)
    this.assignment.uploadProblemFormList.forEach((p, i) => {
      p.indexInAssignment = i + 1
    })
  }
}
</script>

<style scoped lang="scss">
button.v-btn.s-add-btn {
  right: 10px;
  width: 60px;
  height: 60px;
  bottom: -70px;
}

th {
  padding: 6px !important;

  &:last-child {
    padding-right: 0 !important;
    padding-left: 8px !important;
    min-width: 95px !important;
  }
}
</style>

<style lang="scss">
.s-top-tabs {
  position: absolute;
  top: -40px;
  box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.08), -2px 0px 0px 0px rgba(0, 0, 0, 0.06) !important;
}

.s-ca-form {
  margin: 0 auto 10px;

  div.s-left {
    width: 30%;
    min-width: 380px;
    padding: 5px 12px 10px 16px;
    flex-grow: 100;

    .s-ca-form--title {
      width: 100%;
      margin-bottom: 16px;
    }

    .s-ca-form--start-time {
      margin-right: 16px;
    }

    .s-ca-form--start-time, .s-ca-form--end-time {
      margin-bottom: 16px;
      flex-grow: 0;
      width: 180px;
    }

    .v-input--selection-controls {
      margin-top: 6px;
    }
  }

  div.s-right {
    position: relative;
    width: 65%;
    flex-grow: 1;
    min-height: 705px;

    .s-ca-form--description {
      width: 50%;
      flex-grow: 0;
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

    .s-ca-form--description__show {
      padding: 5px 10px;
      width: 48%;
      flex-grow: 1;
    }
  }
}
</style>
