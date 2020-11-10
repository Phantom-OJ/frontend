<template>
  <div class="page-detail-root">
    <s-problem-detail-card />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SProblemDetailCard from "@/components/Problem/SProblemDetailCard.vue";

@Component({
  components: {SProblemDetailCard}
})
export default class SProblemDetail extends Vue {
}
</script>

<style scoped lang="scss">

</style>
