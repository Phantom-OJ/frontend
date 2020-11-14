<template>
  <v-card id="problem-card" class="all-card">
    <s-searchable-card-title :title="'problem'">
      <div class="search">
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.searchA`)"
                      type="text" dense v-model="searchID"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.searchB`)"
                      type="text" dense v-model="searchName"/>
        <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`problem.searchC`)"
                      type="text" dense v-model="searchTags"/>
        <div>
          <v-btn class="search-btn" @click="search">filter</v-btn>
          <v-btn text style="padding: 8px;margin-left: 5px;min-width: 32px;" @click="clear">
            <v-icon class="icon-color-2">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
    </s-searchable-card-title>
    <s-entry-list :entries="problems" :path="'problem'">
      <template v-slot="{entry:problem}">
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
            @click="clickTag"
          ></s-tag>
        </v-col>
        <v-col cols="2" lg="1" class="ellipsis-col">
          {{`${problem.numberSolve}/${problem.numberSubmit}`}}
        </v-col>
      </template>
    </s-entry-list>
    <s-pagination :item-num="itemNum" :max-length="problemInfo.maxLength" :page-index.sync="pageIndex"/>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/General/SSearchableCardTitle.vue";
import SPagination from "@/components/General/SPagination.vue";
import {mapState} from "vuex";
import {Alert, InfoContainer, Tag} from "@/ts/dataDef";
import {Problem} from '@/ts/entries';
import STag from "@/components/General/STag.vue";
import API from "@/ts/api";
import SEntryList from "@/components/General/SEntryList.vue";

@Component({
  components: {SEntryList, STag, SPagination, SSearchableCardTitle},
  computed: {
    ...mapState(['width_height', 'problemInfo'])
  }
})
export default class SProblemCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly problemInfo !: InfoContainer<Problem>

  s_searchID:string=''
  s_searchName:string=''
  s_searchTags:string=''

  created() {
    let {exist, start, end} = this.problemInfo.rangeToLoad(this.problemInfo.pageIndex, this.itemNum)
    if (!exist || this.problemInfo.search) {
      API.getProblems({
        filter: this.problemInfo.filter,
        start, end
      }).then(res => this.$store.commit('setProblemInfo', {list: res, clear: this.problemInfo.search}))
    }
    const filter = this.problemInfo.filter
    this.s_searchID = filter.get('ID')||''
    this.s_searchName = filter.get('name')||''
    this.s_searchTags = filter.get('tags')||''
  }

  get problems(): Array<Problem> {
    let {full, list} = this.problemInfo.pageOf(this.problemInfo.pageIndex, this.itemNum)
    if (!full) {
      //TODO
    }
    return list
  }

  search() {
    //TODO
    this.$alert(new Alert('success', `search ${this.searchID}, ${this.searchName}, ${this.searchTags}`))
  }

  clickTag(tag: string) {
    if (!this.searchTags) {
      this.searchTags = tag
    } else if (this.searchTags.indexOf(tag) === -1) {
      this.searchTags = `${this.searchTags} ${tag}`
    }
    this.search()
  }

  get searchID(): string {
    return this.s_searchID
  }

  set searchID(v:string){
    this.s_searchID = v
    this.commitFilter()
  }

  get searchName(): string {
    return this.s_searchName;
  }

  set searchName(value: string) {
    this.s_searchName = value;
    // this.commitFilter()
  }

  get searchTags(): string {
    return this.s_searchTags;
  }

  set searchTags(value: string) {
    this.s_searchTags = value;
    this.commitFilter()
  }

  get pageIndex() {
    return this.problemInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setProblemInfo', {pageIndex: v})
  }

  clear(){
    this.s_searchID = ''
    this.s_searchName = ''
    this.s_searchTags = ''
    this.commitFilter()
  }

  private commitFilter(){
    let filter = new Map<string, string>([
      ['ID', this.searchID],
      ['name', this.searchName],
      ['tags', this.searchTags]
    ])
    this.$store.commit('setProblemInfo', {filter})
  }
}
</script>

<style scoped lang="scss">
</style>
