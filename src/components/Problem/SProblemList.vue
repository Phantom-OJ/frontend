<template>
  <v-list class="list problem-list">
    <div
      v-for="(problem, index) in problems"
      :key="index"
      class="list-item-container"
    >
      <v-list-item
        class="list-item cursor-hand-hover"
        @click="click(problem.ID)"
      >
        <v-row justify="space-between" style="width: 100%" align-content="center">
          <slot :problem="problem"/>
        </v-row>
      </v-list-item>
      <v-divider/>
    </div>
  </v-list>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
import {Problem} from "@/ts/Entries";
import STag from "@/components/General/STag.vue";

@Component({
  components: {STag}
})
export default class SProblemList extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  readonly problems!: Array<Problem>

  click(ID: number) {
    this.$router.push(`/problem/${ID}`)
  }

  @Emit()
  clickTag(tag:string){}

}
</script>

<style scoped lang="scss">

</style>
