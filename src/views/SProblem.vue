<template>
  <div class="page-root page-all-root">
    <s-problem-card :item-num="8"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SProblemCard from "@/components/Problem/SProblemCard.vue";

@Component({
  components: {SProblemCard}
})
export default class SProblem extends Vue {
}
</script>

<style scoped lang="scss">
</style>
