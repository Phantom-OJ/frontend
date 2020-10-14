<template>
  <div>
    <v-card class="card-shadow">
      <v-card-title>
      <span @click="$router.push('/announcement')" class="cursor-hand-hover">
        {{$t('home.announcement')}}
      </span>
      </v-card-title>
      <hr/>
      <v-card-text id="announcement-card-text" style="padding-top: 12px">
        <ul id="announcement-list">
          <li
            v-for="(a,index) in announcement"
            :key="index"
            class="announcement-item lang-en"
          >
            <v-row justify="space-between" style="height: 24px;margin-right: 0">
              <v-col cols="5" class="announcement-item-text">
                {{a.title}}
              </v-col>
              <v-col cols="2" class="announcement-item-text">
                {{a.time}}
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
                  {{a.content}}
                </v-card-text>
              </v-card>
            </v-dialog>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({
  props:{
    home:{
      type:Boolean,
      default: false
    },
    itemNum:{
      type:Number,
      required:true
    }
  }
})
export default class SAnnouncement extends Vue {
  announcement = [{
    title: 'Presentation',
    time: '2020-10-06',
    show: false,
    content: 'Presentation on 2020-10-10 10 AM'
  }, {
    title: 'QWQ55555555555555555555555555555555555555555555555555555555555555555',
    show: false,
    time: '2020-10-02',
    content: 'qwq'
  }, {
    title: 'lslnb',
    show: false,
    time: '2020-10-01',
    content: 'lslnb'
  }]
}
</script>

<style scoped lang="scss">

  #announcement-list {
    > li.announcement-item {
      padding: 2px 0;
      margin: 5px auto;
      position: relative;
    }


    .announcement-item-text {
      padding: 2px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    padding-left: 12px;
  }

  @media only screen and (max-width: 600px) {
    #announcement-card-text {
      padding: 12px 4px 12px 8px;
    }
  }

</style>
