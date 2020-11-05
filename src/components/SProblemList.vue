<template>
  <v-list class="list">
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
          <v-col cols="2" class="ellipsis-col">
            {{problem.ID}}
          </v-col>
          <v-col cols="4" class="ellipsis-col">
            {{problem.title}}
          </v-col>
          <v-col cols="4" class="s-flex">
            <s-tag
              v-for="(tag, index) in problem.tags"
              :key="index"
              :tag="tag.tag"
              :color="tag.tag.hash().format(6)"
              class=""
              @click="clickTag"
            ></s-tag>
          </v-col>
          <v-col cols="2" md="1" class="ellipsis-col">
            50%
          </v-col>
        </v-row>
      </v-list-item>
      <v-divider/>
    </div>
  </v-list>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator'
import {Problem} from "@/ts/Entries";
import STag from "@/components/STag.vue";

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
  .s-flex {
    display: flex;
    flex-wrap: wrap;
  }

  .col, .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
    line-height: 36px;
  }
</style>
