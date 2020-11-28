<template>
  <div style="min-height: 80%;">
    <s-loading/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SLoading from "@/components/General/SLoading.vue";

@Component({
  components: {SLoading}
})
export default class SAbout extends Vue {
}
</script>

<style scoped lang="scss">

</style>
