<template>
  <v-card class="detail-card">
    <div class="detail-card-title-box" :style="`padding-left: ${width_height.width/80+4}px`">
      <div style="display: flex;align-items: center;flex-wrap: wrap;">
        <div class="ellipsis-col detail-card-title" :style="`padding-top: ${width_height.height/100}px;padding-bottom: 12px;`">
          <v-card-title class="s-record-detail-card-title">
            {{`${$t('record.submission')}: #${record.ID.format(3,'0',false)}`}}
          </v-card-title>
          <v-card-subtitle class="s-record-detail-card-sub s-link" @click="$router.push(`/problem/${record.problemID}`)">
            {{`${$t('record.searchP')}: ${record.problemTitle}`}}
          </v-card-subtitle>
          <v-btn text class="refresh" @click="loadRecord(true)">
            <v-icon class="icon-color-2">mdi-sync</v-icon>
          </v-btn>
        </div>

      </div>
      <v-tabs v-model="tab" background-color="white" color="secondary" right
              class="detail-card-tabs" height="60">
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
    <v-tabs-items v-model="tab">
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
import {Record} from "@/ts/entries";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";
import {EntryContainer} from "@/ts/entry-container";
import SRecordDescription from "@/components/Record/SRecordDescription.vue";

@Component({
  components: {SRecordDescription, SCodemirror, SCodeEditor},
  computed: {
    ...mapState(['width_height', 'recordInfo'])
  }
})
export default class SRecordDetailCard extends Vue {
  readonly width_height!: { width: number, height:number }
  readonly recordInfo!: EntryContainer<Record>

  loading:boolean=false
  private cnt:number = 1

  created() {
    this.$store.commit('setRecordInfo', {selectedID: this.rid})
    this.loadRecord()
  }

  async loadRecord(force=false){
    this.loading = !this.record
    if(this.loading || force){
      let detailRecord = await this.$api.queryRecord(this.rid)
      this.$store.commit('setRecordInfo', {detailRecord})
      this.loading = false
      this.cnt++
    }
  }

  edit(){
    this.$store.commit('setProblemInfo',{code:this.record?.code})
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

</style>
<style scoped lang="scss">
  .refresh{
    top:15px;
  }
</style>
