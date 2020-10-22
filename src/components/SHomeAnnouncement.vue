<template>
  <v-card class="card-shadow">
    <v-card-title>
      <span @click="$router.push('/announcement')" class="cursor-hand-hover">
        {{$t('home.announcement')}}
      </span>
    </v-card-title>
    <hr/>
    <v-card-text class="s-card-container home-card">
      <ul class="s-card-list">
        <li
          v-for="(a,index) in announcement"
          :key="index"
          class="s-card-item lang-en"
        >
          <v-row justify="space-between" class="s-card-item-line">
            <v-col cols="9" sm="9" md="7" lg="7" xl="7" class="s-card-item-text">
              {{a.title}}
            </v-col>
            <v-col v-if="width_height.width > 960" lg="3" md="4" class="s-card-item-text">
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
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";

@Component({
  computed:{
    ...mapState(['width_height'])
  }
})
export default class SHomeAnnouncement extends Vue {
  @Prop({type: Number, required: true})
  readonly itemNum!: number

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
</style>
