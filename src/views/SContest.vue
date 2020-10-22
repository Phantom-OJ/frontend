<template>
  <div id="contest-root">
    <s-contest-card :item-num="10"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SContestCard from "../components/SContestCard.vue";

@Component({
  components: {SContestCard}
})
export default class SContest extends Vue {

}
</script>

<style scoped lang="scss">
  #contest-root {
    min-height: 80%;
  }
</style>
