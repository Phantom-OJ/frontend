<template>
  <div class="page-detail-root">
    <s-assignment-detail-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SAssignmentDetailCard from "@/components/Assignment/SAssignmentDetailCard.vue";

@Component({
  components: {SAssignmentDetailCard}
})
export default class SAssignmentDetail extends Vue {
}
</script>

<style scoped lang="scss">

</style>
