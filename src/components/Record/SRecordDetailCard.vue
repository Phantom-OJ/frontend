<template>
  <v-card class="detail-card">
    <div class="detail-card-title-box" :style="`padding-left: ${width_height.width/80+4}px`">
      <div class="s-record-title-box" style="">
        <div class="ellipsis-col detail-card-title"
             :style="`padding-top: ${width_height.height/100}px;padding-bottom: 12px;`">
          <v-card-title class="s-record-detail-card-title">
            {{`${$t('record.submission')}: #${record.ID.format(3,'0',false)}`}}
          </v-card-title>
          <v-card-subtitle class="s-record-detail-card-sub s-link"
                           @click="$router.push(`/problem/${record.problemID}`)">
            {{`${$t('record.searchP')}: ${record.problemTitle}`}}
          </v-card-subtitle>
          <v-btn text class="refresh" @click="loadRecord(true)">
            <v-icon class="icon-color-2">mdi-sync</v-icon>
          </v-btn>
        </div>
        <s-record-result-box :result="record.result" :score="record.score"/>
        <!--        <v-row style="flex-wrap: wrap;max-width: 800px;">-->
        <!--          <v-col cols="4">-->
        <!--            <v-icon class="icon-color-0">-->
        <!--              mdi-database-->
        <!--            </v-icon>-->
        <!--            {{`${record.space}MB`}}-->
        <!--          </v-col>-->
        <!--          <v-col cols="4">-->
        <!--            <v-icon class="icon-color-0">-->
        <!--              mdi-timer-sand-->
        <!--            </v-icon>-->
        <!--            {{`${record.time}ms`}}-->
        <!--          </v-col>-->
        <!--          <v-col cols="4">-->
        <!--            <v-icon class="icon-color-0">-->
        <!--              mdi-alpha-l-box-->
        <!--            </v-icon>-->
        <!--            {{`${record.dialect.toUpperCase()}`}}-->
        <!--          </v-col>-->
        <!--        </v-row>-->
      </div>
      <v-tabs v-if="paginate" v-model="tab" background-color="white" color="secondary" right
              class="detail-card-tabs" height="50">
        <v-tabs-slider color="accent"/>
        <v-tab>
          {{$t('nav-bar.description')}}
        </v-tab>
        <v-tab v-if="!!record.code">
          {{$t('nav-bar.code')}}
        </v-tab>
      </v-tabs>
    </div>
    <v-divider class="s-divider"/>
    <v-tabs-items v-if="paginate" v-model="tab">
      <v-tab-item>
        <s-record-description :record="record"/>
      </v-tab-item>
      <v-tab-item>
        <s-codemirror v-if="!!record.code" :code="record.code" :mime="`text/x-${record.dialect.toLowerCase()}`"
                      read-only="nocursor"/>
        <div class="s-record-tool">
          <v-icon @click="edit">
            mdi-pencil
          </v-icon>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Record} from "@/ts/entities";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {EntityContainer} from "@/ts/entity-container";
import SRecordDescription from "@/components/Record/SRecordDescription.vue";
import SRecordResultBox from "@/components/Record/SRecordResultBox.vue";

@Component({
  components: {SRecordResultBox, SRecordDescription, SCodemirror, SCodeEditor},
  computed: {
    ...mapState(['width_height', 'recordInfo'])
  }
})
export default class SRecordDetailCard extends Vue {
  readonly width_height!: { width: number, height: number }
  readonly recordInfo!: EntityContainer<Record>

  loading: boolean = false
  private cnt: number = 1

  created() {
    this.loadRecord()
  }

  async loadRecord(force = false) {
    if (!this.record || force) {
      this.loading = true
      let detailRecord = await this.$api.queryRecord(this.rid)
      this.$store.commit('setRecordInfo', {detailRecord})
      this.loading = false
      this.cnt++
    } else if (!this.record.code) {
      let code = await this.record.queryCode()
      this.$store.commit('setRecordInfo', {
        code: {
          code: code,
          id: this.rid
        }
      })
    }
  }

  edit() {
    this.$store.commit('setProblemInfo', {code: this.record?.code})
  }

  get tab(): number {
    return parseInt(this.$route.hash.slice(1))
  }

  set tab(v: number) {
    //@ts-ignore
    this.$router.replace({
      ...this.$route,
      hash: `#${v}`
    })
  }

  get rid(): number {
    return parseInt(this.$route.params.rid)
  }

  get record(): Record | undefined {
    let _ = this.cnt
    return this.recordInfo.get(this.rid)
  }

  get paginate() {
    // return this.width_height.width<800
    return true
  }
}
</script>

<style lang="scss">
  .s-record-detail-card-title {
    text-align: center;
    display: inline-block;
  }

  .inlist-user {
    flex-grow: 0;
  }

  .s-record-title-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-right: 60px;
    justify-content: flex-start;
    width: 400px
  }
</style>
<style scoped lang="scss">
  .refresh {
    top: 15px;
  }

  .record-box {
    flex-grow: 3;
  }
</style>
