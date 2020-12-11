<template>
  <div class="page-detail-root">
    <s-admin-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SAdminCard from "@/components/Administrator/SAdminCard.vue";

@Component({
  components: {SAdminCard}
})
export default class SAdmin extends Vue {
}
</script>

<style scoped lang="scss">

</style>
