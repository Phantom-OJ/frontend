<template>
  <div id="contests-root" class="page-all-root">
    <s-assignment-card :item-num="10"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SAssignmentCard from "@/components/Assignment/SAssignmentCard.vue";

@Component({
  components: {SAssignmentCard, SContestCard: SAssignmentCard}
})
export default class SAssignment extends Vue {

}
</script>

<style scoped lang="scss">
</style>
