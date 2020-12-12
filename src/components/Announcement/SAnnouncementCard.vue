<template>
  <v-card id="problem-card" class="all-card">
    <s-refreshable-card-title title="announcement" @refresh="loadAnnouncements(true)"
                              :subtitle="$t('announce.subtitle')"/>
    <s-entry-list :entities="announcements" path="announcement" :click-item="()=>void 0">
      <template v-slot="{entity:announce}" >
        <v-col cols="2" class="ellipsis-col" @click="showAnnounce(announce)">
          {{ announce.ID }}
        </v-col>
        <v-col cols="5" class="ellipsis-col" @click="showAnnounce(announce)">
          <v-icon class="icon-color-1" style="position: relative;top:1px">
            mdi-bullhorn
          </v-icon>
          {{ announce.title }}
        </v-col>
        <v-col cols="5" class="ellipsis-col" @click="showAnnounce(announce)">
          {{announce.lastModified.sString()}}
        </v-col>
      </template>
    </s-entry-list>
    <s-pagination :item-num="itemNum" :max-length="announcementInfo.maxLength" :page-index.sync="pageIndex"/>
    <v-dialog v-model="dialog" width="80%">
      <v-card class="lang-en">
        <v-card-title>
          {{announce.title}}
        </v-card-title>
        <v-card-text >
          <s-markdown :markdown="announce.description"/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn v-if="permitAdd" fab absolute @click="$router.push('/administrate#3')" class="s-add-btn"
           color="secondary">
      <v-icon>
        mdi-plus-thick
      </v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import SPagination from "@/components/General/SPagination.vue"
import {mapState} from "vuex"
import {Announcement} from '@/ts/entities'
import STag from "@/components/General/STag.vue"
import SEntryList from "@/components/General/SEntityList.vue"
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";
import STooltipIcon from "@/components/General/STooltipIcon.vue";
import {SUtil} from '@/ts/utils'
import {EntityContainer} from "@/ts/entity-container";
import SMarkdown from "@/components/General/SMarkdown.vue";
import {Permission} from "@/ts/user";

@Component({
  components: {SMarkdown, STooltipIcon, SRefreshableCardTitle, SEntryList, STag, SPagination},
  computed: {
    ...mapState(['width_height', 'announcementInfo'])
  }
})
export default class SAnnouncementCard extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum !: number
  readonly width_height !: { width: number, height: number }
  readonly announcementInfo !: EntityContainer<Announcement>

  loading: boolean = false
  dialog: boolean = false
  announce: Announcement = {} as Announcement

  get permitAdd(){
    return this.$store.state.isAuthenticated&&this.$store.state.user.hasPermission(Permission.ALLOWANCE.MANAGE_THE_ANNOUNCEMENT)
  }

  created() {
    this.loadAnnouncements()
  }

  async loadAnnouncements(force: boolean = false) {
    if (this.announcementInfo.list.length===0 || force) {
      this.loading = true
      let {start, end} = SUtil.rangeToLoad(this.announcementInfo.pageIndex, this.itemNum)
      let entityCollection = await this.$api.searchAnnouncementPage({
        start, end,
        filter: this.announcementInfo.filter
      })
      this.$store.commit('setAnnouncementInfo', {
        list: entityCollection.entities,
        max: entityCollection.count
      })
      this.loading = false
    }
  }

  get announcements(): Array<Announcement> {
    return this.announcementInfo.list
  }

  get pageIndex() {
    return this.announcementInfo.pageIndex
  }

  set pageIndex(v) {
    this.$store.commit('setAnnouncementInfo', {pageIndex: v})
    this.loadAnnouncements(true)
  }

  showAnnounce(a:Announcement){
    this.announce = a
    this.dialog = true
  }

}
</script>

<style scoped lang="scss">
</style>
