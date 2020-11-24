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
        <v-row justify="space-between" style="width: 100%;min-height: 70px;" align-content="center">
          <slot :entry="entry"/>
        </v-row>
      </v-list-item>
      <v-divider/>
    </div>
  </v-list>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {Entity} from "@/ts/interfaces";

@Component({})
export default class SEntryList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly entries!: Array<Entity>

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
