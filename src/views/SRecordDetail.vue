<template>
  <div class="page-detail-root">
    <s-record-detail-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SRecordDetailCard from "@/components/Record/SRecordDetailCard.vue";

@Component({
  components: {SRecordDetailCard}
})
export default class SRecordDetail extends Vue {
}
</script>

<style scoped lang="scss">

</style>
