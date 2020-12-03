<template>
  <div class="page-detail-root">
    <s-create-assignment-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SCreateAssignmentCard from "@/components/Assignment/SCreateAssignmentCard.vue";

@Component({
  components: {SCreateAssignmentCard}
})
export default class SCreateAssignment extends Vue {
}
</script>

<style scoped lang="scss">

</style>
