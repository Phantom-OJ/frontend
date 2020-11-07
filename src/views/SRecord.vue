<template>
  <div id="" class="page-all-root">
    <s-record-card :item-num="10" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SRecordCard from "@/components/Record/SRecordCard.vue";

@Component({
  components: {SRecordCard}
})
export default class SRecord extends Vue {
}
</script>

<style scoped lang="scss">

</style>
