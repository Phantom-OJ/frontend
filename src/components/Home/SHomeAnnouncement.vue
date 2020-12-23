<template>
  <v-card class="card-shadow">
    <v-card-title style="padding-left: 24px">
      <span @click="$router.push('/announcement')" class="cursor-hand-hover">
        {{$t('home.announcement')}}
      </span>
    </v-card-title>
    <hr/>
    <v-card-text class="s-card-container home-card">
      <ul class="s-card-list lang-en">
        <li
          v-for="(a,index) in announcements"
          :key="index"
          class="s-card-item lang-en"
        >
          <v-row justify="space-between" class="s-card-item-line">
            <v-col cols="9" sm="9" md="7" lg="7" xl="7" class="s-card-item-text">
              {{a.title}}
            </v-col>
            <v-col v-if="width_height.width > 960" lg="3" md="4" class="s-card-item-text">
              {{a.lastModified.sString()}}
            </v-col>
            <v-btn
              icon
              @click="a.show = !a.show"
              style="height: 22px;width: 22px"
            >
              <v-icon>{{a.show?'':'mdi-chevron-down'}}</v-icon>
            </v-btn>
          </v-row>
          <v-dialog v-model="a.show" width="80%">
            <v-card class="lang-en">
              <v-card-title>
                {{a.title}}
              </v-card-title>
              <v-card-text >
                <s-markdown :markdown="a.description"/>
              </v-card-text>
            </v-card>
          </v-dialog>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Announcement} from "@/ts/entities";
import {SUtil} from "@/ts/utils";
import SMarkdown from "@/components/General/SMarkdown.vue";

@Component({
  components: {SMarkdown},
  computed:{
    ...mapState(['width_height'])
  }
})
export default class SHomeAnnouncement extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum!: number
  readonly width_height!: {width:number, height:number}
  announcements: Array<Announcement> = []
  loading=false

  created(){
    this.loadAnnouncements()
  }

  async loadAnnouncements(force=false){
    if(this.announcements.length===0||force){
      this.loading = true
      const {start, end} = SUtil.rangeToLoad(1, this.itemNum)
      const entityCollection = (await this.$api.searchAnnouncementPage({
        start, end, filter:{ }
      }))
      this.announcements = entityCollection.entities
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
