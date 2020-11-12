<template>
  <v-list class="list problem-list">
    <div
      v-for="(entry, index) in entries"
      :key="index"
      class="list-item-container"
    >
      <v-list-item
        class="list-item cursor-hand-hover"
        @click="click(entry.ID)"
      >
        <v-row justify="space-between" style="width: 100%" align-content="center">
          <slot :entry="entry"/>
        </v-row>
      </v-list-item>
      <v-divider/>
    </div>
  </v-list>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {Entry} from "@/ts/dataDef";

@Component({})
export default class SEntryList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly entries!: Array<Entry>

  @Prop({
    type:String,
    required:true
  })
  readonly path!: string

  click(ID: number) {
    this.$router.push(`/${this.path}/${ID}`)
  }
}
</script>

<style scoped lang="scss">

</style>
