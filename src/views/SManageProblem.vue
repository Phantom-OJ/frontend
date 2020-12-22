<template>
  <div class="page-detail-root">
    <s-loading v-if="loading" class="s-card-loading"/>
    <v-card v-else class="detail-card">
      <s-manage-problem-sheet :is-create="false" @refresh="refresh"/>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SManageProblemSheet from "@/components/Administrator/SManageProblemSheet.vue";
import {ProblemForm} from "@/ts/forms";
import SLoading from "@/components/General/SLoading.vue";

@Component({
  components: {SLoading, SManageProblemSheet}
})
export default class SManageProblem extends Vue {
  loading: boolean = false
  problemForm: ProblemForm = {} as ProblemForm

  created() {
    this.refresh()
  }

  async refresh() {
    this.loading = true
    const ass = await this.$api.getAssignmentForm(this.aid)
    this.problemForm = ass.uploadProblemFormList.find(p => p.id === this.pid)!
    this.loading = false
  }

  get pid() {
    return parseInt(this.$route.params.pid)
  }

  get aid() {
    return parseInt(this.$route.params.aid)
  }
}
</script>

<style scoped lang="scss">

</style>
