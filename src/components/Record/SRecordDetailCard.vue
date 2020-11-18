<template>
  <v-card class="detail-card">
    <div class="detail-card-title-box" :style="`padding-left: ${width_height.width/80}px`">
      <div style="display: flex;align-items: center;flex-wrap: wrap;">
        <div class="ellipsis-col detail-card-title" :style="`padding-top: ${width_height.height/100}px;padding-bottom: 12px;`">
          <v-card-title class="s-record-detail-card-title">
            {{`${$t('record.submission')}: #${record.ID.format(3,'0',false)}`}}
          </v-card-title>
          <v-card-subtitle class="s-record-detail-card-sub" @click="$router.push(`/problem/${record.problemId}`)">
            {{`${$t('record.searchP')}: ${record.problemTitle}`}}
          </v-card-subtitle>
        </div>
        <span class="inlist-user">
          <v-avatar
            :size="48"
            class="inlist-user-avatar"
          >
            <img :src="record.user.avatar">
          </v-avatar>
          <div class="inlist-user-label ellipsis-col">
            <span class="padding-l-12 ellipsis-col">
              {{`${record.user.name}`}}
            </span>
            <span class="padding-l-12 ellipsis-col">
              {{record.submitTime.sString()}}
            </span>
          </div>
        </span>
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
        TODO
      </v-tab-item>
      <v-tab-item>
        <s-codemirror v-if="!!record.code" :code="record.code" :mime="`text/x-${record.dialect.toLowerCase()}`"
                      read-only="nocursor"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Record} from "@/ts/entries";
import {InfoContainer} from "@/ts/interfaces";
import SCodeEditor from "@/components/Problem/SCodeEditor.vue";
import SCodemirror from "@/components/General/SCodemirror.vue";

@Component({
  components: {SCodemirror, SCodeEditor},
  computed: {
    ...mapState(['width_height', 'recordInfo'])
  }
})
export default class SRecordDetailCard extends Vue {
  readonly width_height!: { width: number, height:number }
  readonly recordInfo!: InfoContainer<Record>

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

  created() {
    this.$store.commit('setRecordInfo', {selectedID: this.rid})
  }

  get rid(): number {
    return parseInt(this.$route.params.rid)
  }

  get record(): Record | null {
    let _r = this.recordInfo.map.get(this.rid)
    if (!!_r) {
      return _r
    } else {
      //TODO
      return null
    }
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
