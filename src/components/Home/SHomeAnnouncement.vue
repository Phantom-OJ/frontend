<template>
  <v-card class="card-shadow">
    <v-card-title style="padding-left: 24px">
      <span @click="$router.push('/announcement')" class="cursor-hand-hover">
        {{$t('home.announcement')}}
      </span>
    </v-card-title>
    <hr/>
    <v-card-text class="s-card-container home-card">
      <ul class="s-card-list">
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
              {{a.lastModified.sString()||typeof a.lastModified}}
            </v-col>
            <v-btn
              icon
              @click="a.show = !a.show"
              style="height: 22px;width: 22px"
            >
              <v-icon>{{a.show?'':'mdi-chevron-down'}}</v-icon>
            </v-btn>
          </v-row>
          <v-dialog v-model="a.show" width="500">
            <v-card class="lang-en">
              <v-card-title>
                {{a.title}}
              </v-card-title>
              <v-card-text>
                {{a.description}}
              </v-card-text>
            </v-card>
          </v-dialog>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Announcement} from "@/ts/entries";
import {InfoContainer} from "@/ts/interfaces";

@Component({
  computed:{
    ...mapState(['width_height', 'announcementInfo'])
  }
})
export default class SHomeAnnouncement extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum!: number
  readonly width_height!: {width:number, height:number}
  readonly announcementInfo!: InfoContainer<Announcement>
  announcements: Array<Announcement> = []

  created(){
    let {full, list} = this.announcementInfo.pageOf(0, this.itemNum)
    if(full){
      for(let a of list){
        this.announcements.push(Announcement.copy(a))
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
