<template>
  <div class="s-card-loading">
    <div class="search">
      <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`assignment.searchA`)"
                    type="text" dense v-model="filter.id"/>
      <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`assignment.searchB`)"
                    type="text" dense v-model="filter.name"/>
      <div>
        <v-btn class="search-btn" @click="loadAssignments(true)">filter</v-btn>
        <v-btn text style="padding: 8px;margin-left: 5px;min-width: 32px;" @click="clear">
          <v-icon class="icon-color-2">
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-treeview :items="assignments" item-key="ID" item-text="title" item-children="problemList" open-on-click
                class="ass-tree">
      <template v-slot:label="{item, leaf}">
        <div class="s-flex" v-if="leaf">
          <span style="font-size: 20px;">
            {{ item.title }}
          </span>
          <v-icon @click="e=>editProb(e, item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="e=>deleteProb(e, item)">
            mdi-delete-off
          </v-icon>
        </div>
        <div class="s-flex" v-else>
          <v-card-title style="font-size: 24px;">
            {{ item.title }}
          </v-card-title>
          <s-tooltip-icon :size="20" :text="$t('assignment.download score')" @click="e=>downScore(e, item)">
            mdi-transfer-down
          </s-tooltip-icon>
          <v-icon @click="e=>editAss(e,item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="e=>deleteAss(e,item)">
            mdi-delete-off
          </v-icon>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";
import {mapState} from "vuex";
import {EntityContainer} from "@/ts/entity-container";
import {Assignment, Problem} from "@/ts/entities";
import {Filter} from "@/ts/interfaces";
import STooltipIcon from "@/components/General/STooltipIcon.vue";

@Component({
  components: {STooltipIcon},
  computed: {...mapState(['assignmentInfo'])}
})
export default class SManageAssignmentSheet extends Vue {

  readonly assignmentInfo !: EntityContainer<Assignment>

  loading: boolean = false
  assignments: Assignment[] = []
  max: number = 0
  filter: Filter = {
    id: '',
    name: ''
  }

  created() {
    this.loadAssignments()
  }

  async loadAssignments(force: boolean = false) {
    let {start, end} = SUtil.rangeToLoad(this.assignmentInfo.pageIndex, 10)
    if (this.assignments.length <= 0 || force) {
      this.loading = true
      let entityCollection = await this.$api.searchAssignmentPage({
        start, end,
        filter: this.filter
      })
      this.assignments = entityCollection.entities
      this.max = entityCollection.count
      this.loading = false
    }
  }

  clear() {
    this.filter = {
      id: '',
      name: ''
    }
  }

  editProb(e: Event, prob: Problem) {
    e.stopPropagation()
    console.log(prob)
    this.$router.push(`/modify/assignment/${prob.assignmentId}/problem/${prob.ID}`)
  }

  async deleteProb(e: Event, prob: Problem) {
    e.stopPropagation()
    if (window.confirm(this.$t('warning.warn').toString())) {
      const msg = await this.$api.deleteProblem(prob.ID)
      SUtil.alertIfSuccess(msg, 'success.delete', this)
    }
  }

  downScore(e: Event, ass: Assignment) {
    e.stopPropagation()

  }

  editAss(e: Event, ass: Assignment) {
    e.stopPropagation()
    this.$router.push(`/modify/assignment/${ass.ID}`)
  }

  async deleteAss(e: Event, ass: Assignment) {
    e.stopPropagation()
    if (window.confirm(this.$t('warning.warn').toString())) {
      const msg = await this.$api.deleteAssignment(ass.ID)
      SUtil.alertIfSuccess(msg, 'success.delete', this)
      await this.loadAssignments(true)
    }
  }
}
</script>

<style lang="scss">
.ass-tree {
  width: 50%;
  min-width: 360px;
  padding-left: 24px;

  .s-flex > div, .s-flex > button, .s-flex > span {
    margin: 2px 2px 2px 8px;
    padding: 0;
  }

  .s-flex > button {
    width: 32px;
    height: 32px;
  }
}
</style>

<style scoped lang="scss">
.search {
  width: 600px;
  min-width: 300px;
}
</style>
