<template>
  <v-list class="list problem-list lang-en">
    <transition-group name="slide-x-reverse-transition">
      <div
        v-for="entity in entities_"
        :key="entity.ID"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(entity.ID)"
        >
          <v-row justify="space-between" style="width: 100%;min-height: 70px;" align-content="center">
            <slot :entity="entity"/>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </transition-group>
  </v-list>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, Watch} from 'vue-property-decorator'
import {Entity} from "@/ts/interfaces";
import {SUtil} from "@/ts/utils";

@Component({})
export default class SEntryList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly entities!: Array<Entity>

  @Prop({
    type: String,
    required: true
  })
  readonly path!: string

  @Prop()
  clickItem?:(ID:number)=>void

  entities_: Entity[] = []
  flagAni: boolean = false

  @Watch('entities', {immediate: true})
  async entityChange() {
    if (this.flagAni) {
      return
    }
    this.flagAni = true
    while (this.entities_.length > 0) {
      this.entities_.shift()
    }
    await SUtil.sleep(300)
    for (let i of [...this.entities]) {
      this.entities_.push(i)
    }
    this.flagAni = false
  }

  click(ID: number) {
    if (!this.clickItem) {
      this.$router.push(`/${this.path}/${ID}`)
    }else{
      this.clickItem(ID)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
