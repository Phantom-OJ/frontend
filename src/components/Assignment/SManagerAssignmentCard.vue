<template>
  <v-card class="top-tabs-card">
    <v-sheet class="s-top-tabs">
      <v-slide-x-transition>
        <v-tabs :height="40" v-model="tab">
          <v-tab>
            {{ $t('create.description') }}
          </v-tab>
          <v-slide-x-transition>
            <v-tab
              v-for="problem in problemList"
              :key="problem.indexInAssignment"
            >
              {{ `${$t('create.problem.&')}. ${problem.title}` }}
            </v-tab>
          </v-slide-x-transition>
        </v-tabs>
      </v-slide-x-transition>
    </v-sheet>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-form class="s-ca-form s-flex">
          <div class="s-left">
            <v-text-field :label="$t('create.title')" color="primary" hide-details v-model="title"
                          class="s-ca-form--title"/>
            <div class="s-flex" style="justify-content: space-between">
              <s-date-time-picker :date.sync="startDate" :time.sync="startTime" s-class="s-ca-form--start-time"
                                  :label="$t('create.start-time')"/>
              <s-date-time-picker :date.sync="endDate" :time.sync="endTime" s-class="s-ca-form--end-time"
                                  :label="$t('create.end-time')"/>
            </div>
            <v-dialog>
              <template v-slot:activator="{on, attrs}">
                <v-text-field readonly v-on="on" v-bind="attrs" :value="activeGroupNames" :label="$t('profile.group')"/>
              </template>
              <s-splitted-select :active.sync="activeGroups" :inactive.sync="inactiveGroups"
                                 :filter="(e, f)=>e.description.includes(f)">
                <template v-slot:active="{entity}">
                  <v-chip label color="white">
                    <v-icon left>mdi-account-multiple</v-icon>
                    {{ entity.description }}
                  </v-chip>
                </template>
                <template v-slot:inactive="{entity}">
                  <v-chip label color="white">
                    <v-icon left>mdi-account-multiple</v-icon>
                    {{ entity.description }}
                  </v-chip>
                </template>
                <v-card-title style="padding-bottom: 0">Please Select Groups</v-card-title>
              </s-splitted-select>
            </v-dialog>
            <v-radio-group v-model="status" :label="$t('create.status')" row>
              <v-radio v-for="_status in STATUS" :key="_status" :label="_status" :value="_status"/>
            </v-radio-group>

            <!--            <v-select :label="$t('create.problem.type')" v-model="type" :items="TYPE"></v-select>TODO-->
            <v-simple-table class="relative" style="margin-bottom: 76px">
              <thead>
              <tr>
                <th>{{ $t('create.problem.&') }}</th>
                <th>{{ $t('problem.score') }}</th>
                <th>{{ $t('create.status') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="p in problemList" :key="p.indexInAssignment">
                <th>{{ p.title }}</th>
                <th>{{ p.fullScore }}</th>
                <th>{{ p.status }}</th>
              </tr>
              </tbody>
              <v-btn v-if="permitAddProblem" fab absolute @click="addProblem" class="s-add-btn" color="secondary">
                <v-icon>
                  mdi-plus-thick
                </v-icon>
              </v-btn>
            </v-simple-table>
            <v-btn color="success" shaped>{{ $t('submit') }}</v-btn>
          </div>
          <div class="s-right s-flex">
            <v-textarea :label="$t('create.description')" color="primary" hide-details v-model="description"
                        class="s-ca-form--description inline-block" filled auto-grow height="706"/>
            <s-markdown :markdown="description" class="s-ca-form--description__show"/>
          </div>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SDateTimePicker from "@/components/General/SDateTimePicker.vue";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {ProblemForm, STATUS, TYPE} from "@/ts/forms";
import {Group, Permission} from "@/ts/user";
import SSplitSelect from "@/components/General/SSplitSelect.vue";

@Component({
  components: {SSplittedSelect: SSplitSelect, SMarkdown, SDateTimePicker}
})
export default class SCreateAssignmentCard extends Vue {
  readonly STATUS = STATUS.values()
  readonly TYPE = TYPE.values()
  tab: number = 0
  description: string = `# markdown supported\n\n$$\nembedded\\;latex\\;supported\n$$`
  title: string = ''
  startDate: string = new Date().toISOString().substring(0, 10)
  startTime: string = '00:00'
  endDate: string = new Date().toISOString().substring(0, 10)
  endTime: string = '00:00'
  status: string = 'public'
  type: string = 'SELECT'
  problemList: ProblemForm[] = []
  activeGroups: Group[] = [{ID: 1, description: 'lslnb'}, {ID: 1, description: 'lslnb'}]
  inactiveGroups: Group[] = [{ID: 2, description: 'qsyyds'}]

  get permitAddProblem() {
    return this.$store.state.user?.hasPermission(Permission.ALLOWANCE.CREATE_PROBLEM) ?? false
  }

  get activeGroupList() {
    return this.activeGroups.map(g => g.ID)
  }

  get activeGroupNames() {
    return this.activeGroups.map(g => g.description).join(' ')
  }

  addProblem() {
    this.problemList.push({
      title: `${this.problemList.length}`,
      description: '# markdown supported\n\n$$\nembedded\\;latex\\;supported\n$$',
      status: 'public',
      solution: '',
      spaceLimit: 64,
      timeLimit: 3000,
      fullScore: 20,
      indexInAssignment: this.problemList.length,
      type: 'SELECT',
      tagList: [0]
    })
  }

  addGroup() {

  }
}
</script>

<style scoped lang="scss">
.s-add-btn {
  right: 10px;
  width: 60px;
  height: 60px;
  bottom: -70px;
}
</style>

<style lang="scss">
.s-top-tabs {
  position: absolute;
  top: -40px;
  box-shadow: -1px -1px 0px 0px rgba(0, 0, 0, 0.08), -2px 0px 0px 0px rgba(0, 0, 0, 0.06) !important;
}

.s-ca-form {
  margin: 10px auto;

  div.s-left {
    width: 30%;
    min-width: 380px;
    margin: 5px 12px 10px 16px;

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
    }

    .v-input--selection-controls {
      margin-top: 6px;
    }
  }

  div.s-right {
    position: relative;
    width: 60%;
    flex-grow: 10;
    padding-left: 12px;

    .s-ca-form--description {
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

    .s-ca-form--description__show {
      padding: 5px 10px;
      width: 48%;
    }
  }
}
</style>
