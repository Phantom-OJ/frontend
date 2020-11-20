<template>
  <div class="page-all-root">
    <s-help-card/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SHelpCard from '@/components/SHelpCard.vue';

@Component({
  components: {SHelpCard}
})
export default class SHelp extends Vue {

}
</script>

<style scoped lang="scss">
</style>
