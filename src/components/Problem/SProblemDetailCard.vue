<template>
  <v-card class="detail-card">
    <div v-if="width_height.width>1200" class="detail-card-title-box--vertical">
      <v-tabs v-model="tab" background-color="white" color="secondary" vertical
              class="detail-card-tabs--vertical" height="160">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
        <v-tab v-if="!!problem.solution">
          {{$t('solution')}}
        </v-tab>
      </v-tabs>
      <div class="ellipsis-col detail-card-title--vertical">
        <v-card-title class="s-p-d-c-title">
          {{problem.title}}
        </v-card-title>
        <v-card-subtitle class="s-p-d-c-sub">
          <div style="margin: 7px auto 10px auto">
            <v-icon class="icon-color-0 icon-left-5">
              mdi-database
            </v-icon>
            {{`${problem.spaceLimit}MB`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-timer-sand
            </v-icon>
            {{`${problem.timeLimit}ms`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-bullseye
            </v-icon>
            {{`${problem.fullScore}`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-upload
            </v-icon>
            {{problem.numberSubmit}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-check
            </v-icon>
            {{problem.numberSolve}}
          </div>
          <div>
            <s-tag
              v-for="(tag, index) in problem.tags"
              :key="index"
              :tag="tag.tag"
              :color="tag.tag.hash().format(6)"
              class="cursor-hand-hover"
              @click="clickTag"
            ></s-tag>
          </div>
        </v-card-subtitle>
      </div>
    </div>
    <div v-else class="detail-card-title-box">
      <div class="detail-card-title ellipsis-col">
        <v-card-title class="s-p-d-c-title">
          {{problem.title}}
          <span style="font-size: 14px">
            <v-icon class="icon-color-0 icon-left-5">
              mdi-database
            </v-icon>
            {{`${problem.spaceLimit}MB`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-timer-sand
            </v-icon>
            {{`${problem.timeLimit}ms`}}
            <v-icon class="icon-color-0 icon-left-5">
              mdi-bullseye
            </v-icon>
            {{`${problem.fullScore}`}}
          </span>
        </v-card-title>
        <v-card-subtitle class="s-p-d-c-sub">
          {{`${$t('problem.submitted')}: ${problem.numberSubmit} / ${$t('problem.solved')}: ${problem.numberSolve}`}}
          <br>
          <div style="margin-top: 5px">
            <s-tag
              v-for="(tag, index) in problem.tags"
              :key="index"
              :tag="tag.tag"
              :color="tag.tag.hash().format(6)"
              class="cursor-hand-hover"
              @click="clickTag"
            ></s-tag>
          </div>
        </v-card-subtitle>
      </div>
      <v-tabs v-model="tab" background-color="white" right class="detail-card-tabs" height="60" color="secondary">
        <v-tabs-slider color="accent"/>
        <v-tab
          v-for="bar in tabs"
          :key="bar"
        >
          {{$t(bar)}}
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div v-html="problem.description" class="description"></div>
      </v-tab-item>
      <v-tab-item>
        TODO
      </v-tab-item>
      <v-tab-item>
        TODO
      </v-tab-item>
      <v-tab-item>
        <s-record-list :records="records"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Problem, Record} from "@/ts/Entries";
import STag from "@/components/General/STag.vue";
import SRecordList from "@/components/Record/SRecordList.vue";

@Component({
  components: {SRecordList, STag},
  computed: {...mapState(['width_height'])}
})
export default class SProblemDetailCard extends Vue {
  readonly width_height!: { width: number }
  readonly tabs: Array<string> = ['nav-bar.description', 'submit', 'nav-bar.statistic', 'nav-bar.rec']
  tab: number = 1
  records: Array<Record> = []

  created() {
    this.$store.commit('setProblemInfo', {selectID: this.pid})
    this.loading = !this.problem
    this.records = this.$store.state.recordInfo.list//TODO
  }

  get loading(): boolean {
    return this.$store.state.loading
  }

  set loading(v) {
    this.$store.commit('setLoading', v)
  }

  get pid(): number {
    return parseInt(this.$route.params.pid)
  }

  get problem(): Problem | null {
    let a = this.$store.state.problemInfo.map.get(this.pid)
    if (!!a) {
      this.loading = false
      return a
    } else {
      this.loading = true
      return null
    }
  }

  clickTag(tag: string) {
    this.$store.commit('setProblemInfo', {
      filter: tag
    })
    this.$router.push('/problem/all')
  }
}
</script>

<style scoped lang="scss">
  .s-p-d-c-title {
    text-align: center;
    display: inline-block;
    position: relative;
    /*left: 60px;*/
  }
</style>
