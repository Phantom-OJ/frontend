<template>
  <s-entry-list :entries="records" :path="'record'">
    <template v-slot="{entry:record}">
      <v-col>
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
      </v-col>
      <v-col class="ellipsis-col" style="min-width: 100px">
        {{$store.state.problemInfo.map.get(record.pid).title}}
      </v-col>
      <v-col :style="`${recordColor(record.result)};`" class="record ellipsis-col">
        <v-icon class="icon-color-F">
          {{recordIcon(record.result)}}
        </v-icon>
        {{record.result}}
      </v-col>
      <v-col class="ellipsis-col" style="min-width: 300px;margin-right: 10px">
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
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Record} from "@/ts/entries"
import SEntryList from "@/components/General/SEntryList.vue";

@Component({
  components: {SEntryList}
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

  recordIcon(result: string) {
    switch (result) {
      case 'AC':
        return 'mdi-check'
      case 'WA':
        return 'mdi-bomb'
      case 'TLE':
        return 'mdi-clock-out'
      case 'MLE':
        return 'mdi-memory'
      case 'RE':
        return 'mdi-bug'
      default:
        return 'mdi-help'
    }
  }

  recordColor(result: string) {
    switch (result) {
      case 'AC':
        // return `background-color: var(--v-success-lighten1);`
        return `background: radial-gradient(var(--v-success-base),var(--v-success-lighten1));`
      case 'WA':
        return `background: radial-gradient(var(--v-error-base),var(--v-error-lighten1));`
      case 'TLE':
      case 'MLE':
      case 'RE':
        return `background: radial-gradient(var(--v-warning-base),var(--v-warning-lighten1));`
      default:
        return `background: radial-gradient(var(--v-accent-base),var(--v-accent-lighten1));`
    }
  }
}
</script>

<style scoped lang="scss">
  .inlist-user {
    display: flex;
    align-items: center;

    .inlist-user-avatar {
      flex-shrink: 2;
    }

    .inlist-user-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.5;
    }
  }

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
