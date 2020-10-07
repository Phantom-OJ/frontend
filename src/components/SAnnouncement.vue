<template>
  <div class="card-shadow">
    <v-card-title>
      {{$t('home.announcement')}}
    </v-card-title>
    <hr/>
    <v-card-text style="padding-top: 12px">
      <ul id="announcement-list" style="padding-left: 12px">
        <li
          v-for="(a,index) in announcement"
          :key="index"
          class="announcement-item lang-en"
        >
          {{a.title}}
          <v-btn icon @click="a.show = !a.show">
            <v-icon>{{a.show?'':'mdi-chevron-down'}}</v-icon>
          </v-btn>
          <v-dialog v-model="a.show"  width="500">
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
  </div>
</template>

<script>
import {Component, Vue} from 'vue-property-decorator'

@Component({})
export default class SAnnouncement extends Vue{
  announcement = [{
    title: 'lslnb',
    show: false,
    content: 'lslnb'
  }, {
    title: 'qsnb',
    show: false,
    content: 'ff02::1'
  }, {
    title: 'zynb',
    show: false,
    content: 'OOAD'
  }]
}
</script>

<style scoped lang="scss">

  #announcement-list>li.announcement-item {
    padding: 2px 0;
    margin: 5px auto;
  }
</style>
