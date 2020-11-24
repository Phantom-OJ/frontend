<template>
  <s-entry-list :entries="records" :path="'record'">
    <template v-slot="{entry:record}">
      <v-col>
        <span class="inlist-user">
          <v-avatar
            :size="48"
            class="inlist-user-avatar"
          >
            <img :src="record.avatar">
          </v-avatar>
          <div class="inlist-user-label ellipsis-col">
            <span class="padding-l-12 ellipsis-col">
              {{`${record.username}`}}
            </span>
            <span class="padding-l-12 ellipsis-col">
              {{record.submitTime.sString()}}
            </span>
          </div>
        </span>
      </v-col>
      <v-col class="ellipsis-col" style="min-width: 100px;font-weight: 600;">
        <v-icon class="icon-color-1" style="position: relative;top: 1px">
          mdi-quora
        </v-icon>
        {{record.problemTitle}}
      </v-col>
      <v-col>
        <s-record-result-box :result="record.result" :score="record.score"/>
      </v-col>
      <v-col class="ellipsis-col" style="min-width: 280px;margin-right: 10px;max-width: 350px;">
        <v-row>
          <v-col cols="4">
            <v-icon class="icon-color-0">
              mdi-database
            </v-icon>
            {{`${record.space}MB`}}
          </v-col>
          <v-col cols="4">
            <v-icon class="icon-color-0">
              mdi-timer-sand
            </v-icon>
            {{`${record.time}ms`}}
          </v-col>
          <v-col cols="4">
            <v-icon class="icon-color-0">
              mdi-alpha-l-box
            </v-icon>
            {{`${record.dialect.toUpperCase()}`}}
          </v-col>
        </v-row>
      </v-col>
    </template>
  </s-entry-list>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {Record} from "@/ts/entities"
import SEntryList from "@/components/General/SEntryList.vue";
import SRecordResultBox from "@/components/Record/SRecordResultBox.vue";

@Component({
  components: {SRecordResultBox, SEntryList}
})
export default class SRecordList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly records!: Array<Record>

  click(ID: number) {
    this.$router.push(`/record/${ID}`)
  }
}
</script>

<style scoped lang="scss">

  .col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    line-height: 36px;

    .v-icon.v-icon:not(.icon-color-0) {
      position: relative;
      bottom: 3px;
    }

    .icon-color-0 {
      position: relative;
      bottom: 2px;
    }
  }
</style>
