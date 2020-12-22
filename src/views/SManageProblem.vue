<template>
  <div class="page-detail-root">
    <v-card class="detail-card">
      <s-manage-problem-sheet :is-create="false"/>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SManageProblemSheet from "@/components/Administrator/SManageProblemSheet.vue";
import {ProblemForm} from "@/ts/forms";

@Component({
  components: {SManageProblemSheet}
})
export default class SManageProblem extends Vue {

  problemForm:ProblemForm={} as ProblemForm

  created() {
    //TODO
  }

  get pid(){
    return parseInt(this.$route.params.pid)
  }
}
</script>

<style scoped lang="scss">

</style>
