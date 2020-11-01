<template>
  <div class="page-root page-all-root">
    <s-problem-card :item-num="10"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SProblemCard from "@/components/SProblemCard.vue";

@Component({
  components: {SProblemCard}
})
export default class SProblem extends Vue {
}
</script>

<style scoped lang="scss">
</style>
