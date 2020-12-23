<template>
  <div class="s-flex s-record-des-window">
    <div class="s-record-des">
      <div class="inlist-user">
        <v-avatar
          :size="72"
          class="inlist-user-avatar cursor-hand-hover"
          @click="$router.push(`/profile/${record.userID}/home`)"
        >
          <img :src="record.avatar" alt="avatar">
        </v-avatar>
        <div class="inlist-user-label ellipsis-col" style="margin-right: 10px;">
            <span class="padding-l-12 ellipsis-col">
              {{ `${record.username}` }}
            </span>
          <span class="padding-l-12 ellipsis-col">
              {{ record.submitTime.sString() }}
            </span>
        </div>
      </div>
      <v-row>
        <v-col cols="4">
          <v-icon class="icon-color-0">
            mdi-database
          </v-icon>
          {{ `${record.space}MB` }}
        </v-col>
        <v-col cols="4">
          <v-icon class="icon-color-0">
            mdi-timer-sand
          </v-icon>
          {{ `${record.time}ms` }}
        </v-col>
        <v-col cols="4">
          <v-icon class="icon-color-0">
            mdi-alpha-l-box
          </v-icon>
          {{ `${record.dialect.toUpperCase()}` }}
        </v-col>
      </v-row>
    </div>
    <v-timeline dense class="s-record-points">
      <v-timeline-item
        v-for="(point,index) in points"
        :key="index"
        fill-dot
        :color="recordColor(point.result)"
      >
        <template v-slot:icon>
          <span style="color:ghostwhite;">
            {{ point.judgePointIndex }}
          </span>
        </template>
        <div>
          <v-row align="center" class="s-record-point" justify="space-around">
            <s-record-result-box :result="point.result"/>
            <v-col style="max-width: 260px">
              <v-row>
                <v-col cols="6">
                  <v-icon class="icon-color-0">
                    mdi-database
                  </v-icon>
                  {{ `${point.space}MB` }}
                </v-col>
                <v-col cols="6">
                  <v-icon class="icon-color-0">
                    mdi-timer-sand
                  </v-icon>
                  {{ `${point.time}ms` }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <p style="text-align: center;font-size: 24px;background-color: rgba(0,0,0,0.12);border-radius: 4px;margin-right: 12px">{{point.description}}</p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {SUtil} from "@/ts/utils";
import SRecordResultBox from "@/components/Record/SRecordResultBox.vue";
import {Record} from "@/ts/entities";

@Component({
  components: {SRecordResultBox}
})
export default class SRecordDescription extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  record!: Record

  recordColor = SUtil.recordColor

  get points() {
    return this.record.description
  }
}
</script>

<style scoped lang="scss">
.v-timeline-item {
  padding-bottom: 52px;
}

.s-record-des-window {
  min-height: 300px;

  .s-record-des {
    height: 100%;
    width: 40%;
    min-width: 300px;
    max-width: 420px;
    margin: 10px auto;
    @media screen and (max-width: 600px) {
      .col.col-4 {
        padding-left: 6px !important;
        padding-right: 6px !important;
      }
    }
  }
}
</style>
<style lang="scss">
.s-record-point {
  width: 60%;
  margin: 10px auto;
}
</style>
