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
    <v-list class="list">
      <div
        v-for="(problem, index) in problems"
        :key="index"
        class="list-item-container"
      >
        <v-list-item
          class="list-item cursor-hand-hover"
          @click="click(problem.ID)"
        >
          <v-row justify="space-between" style="width: 100%" align-content="center">
            <v-col cols="2" class="ellipsis-col">
              {{problem.ID}}
            </v-col>
            <v-col cols="5" md="6" class="ellipsis-col">
              {{problem.title}}
            </v-col>
            <v-col cols="3" class="s-flex">
              <s-tag
                v-for="(tag, index) in problem.tags"
                :key="index"
                :tag="tag.tag"
                :color="tag.tag.hash().format(6)"
                class=""
                @click="clickTag"
              ></s-tag>
            </v-col>
            <v-col cols="2" md="1" class="ellipsis-col">
              50%
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider/>
      </div>
    </v-list>
    <s-pagination :item-num="itemNum" :max-length="problemInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/SSearchableCardTitle.vue";
import SPagination from "@/components/SPagination.vue";
import {mapState} from "vuex";
import {InfoContainer, Tag} from "@/ts/DataDef";
import {Problem} from '@/ts/Entries';
import STag from "@/components/STag.vue";

@Component({
  components: {STag, SPagination, SSearchableCardTitle},
  computed: {
    ...mapState(['width_height', 'problemInfo'])
  }
})
export default class SProblemCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly problemInfo !: InfoContainer<Problem>

  click(ID: number) {
    this.$router.push(`/problem/${ID}`)
  }

  get problems(): Array<Problem> {
    let {full, list} = this.problemInfo.pageOf(this.problemInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  get searchContent():string {
    return this.problemInfo.filter as string
  }

  set searchContent(v){
    this.$store.commit('setProblemInfo',{
      filter:v
    })
  }

  search() {
    //TODO
    console.log(this.searchContent)
  }

  clickTag(tag:string){
    if(!this.searchContent){
      this.searchContent = tag
    }else if(this.searchContent.indexOf(tag)===-1){
      this.searchContent =`${this.searchContent} ${tag}`
    }
    this.search()
  }

  get pageIndex(){
    return this.problemInfo.pageIndex
  }

  set pageIndex(v){
    this.$store.commit('setProblemInfo',{pageIndex:v})
  }
}
</script>

<style scoped lang="scss">
  .s-flex{
    display: flex;
    flex-wrap: wrap;
  }
  .col,.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12{
    line-height: 36px;
  }
</style>
