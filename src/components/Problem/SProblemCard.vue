<template>
  <v-card id="problem-card" class="all-card">
    <s-searchable-card-title :title="'problem'">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details
                      class="search-input" :label="$t(`problem.search`)"
                      type="text" dense clearable @click:clear="searchContent=''"
                      v-model="searchContent"></v-text-field>
        <v-btn class="search-btn" @click="search">filter</v-btn>
      </div>
    </s-searchable-card-title>
    <s-problem-list :problems="problems" @click-tag="clickTag">
      <template v-slot="{problem}">
        <v-col cols="2" class="ellipsis-col">
          {{problem.ID}}
        </v-col>
        <v-col cols="4" class="ellipsis-col">
          {{problem.title}}
        </v-col>
        <v-col cols="4" class="s-flex">
          <s-tag
            v-for="(tag, index) in problem.tags"
            :key="index"
            :tag="tag.tag"
            :color="tag.tag.hash().format(6)"
            class=""
            @click="clickTag"
          ></s-tag>
        </v-col>
        <v-col cols="2" lg="1" class="ellipsis-col">
          {{`${problem.numberSolve}/${problem.numberSubmit}`}}
        </v-col>
      </template>
    </s-problem-list>
    <s-pagination :item-num="itemNum" :max-length="problemInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/General/SSearchableCardTitle.vue";
import SPagination from "@/components/General/SPagination.vue";
import {mapState} from "vuex";
import {InfoContainer, Tag} from "@/ts/DataDef";
import {Problem} from '@/ts/Entries';
import STag from "@/components/General/STag.vue";
import SProblemList from "@/components/Problem/SProblemList.vue";
import API from "@/ts/API";

@Component({
  components: {SProblemList, STag, SPagination, SSearchableCardTitle},
  computed: {
    ...mapState(['width_height', 'problemInfo'])
  }
})
export default class SProblemCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly problemInfo !: InfoContainer<Problem>

  created() {
    let {exist, start, end} = this.problemInfo.rangeToLoad(this.problemInfo.pageIndex, this.itemNum)
    if (!exist || this.problemInfo.search) {
      API.getProblems({
        filter:this.problemInfo.filter,
        start, end
      }).then(res=>this.$store.commit('setProblemInfo',{list:res, clear:this.problemInfo.search}))
    }
  }

  get problems(): Array<Problem> {
    let {full, list} = this.problemInfo.pageOf(this.problemInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  get searchContent(): string {
    return this.problemInfo.filter as string
  }

  set searchContent(v) {
    this.$store.commit('setProblemInfo', {
      filter: v
    })
  }

  search() {
    //TODO
    console.log(this.searchContent)
  }

  clickTag(tag: string) {
    if (!this.searchContent) {
      this.searchContent = tag
    } else if (this.searchContent.indexOf(tag) === -1) {
      this.searchContent = `${this.searchContent} ${tag}`
    }
    this.search()
  }

  get pageIndex() {
    return this.problemInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setProblemInfo', {pageIndex: v})
  }
}
</script>

<style scoped lang="scss">
</style>
