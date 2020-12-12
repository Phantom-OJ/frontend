<template>
  <div class="page-detail-root">
    <s-manager-assignment-card />
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SManagerAssignmentCard from "@/components/Administrator/SManageAssignmentCard.vue";

@Component({
  components: {SManagerAssignmentCard}
})
export default class SCreateAssignment extends Vue {
}
</script>

<style scoped lang="scss">

</style>
