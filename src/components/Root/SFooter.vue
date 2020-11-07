<template>
  <v-footer id="s-footer" color="white">
    <v-row justify="center">
      <v-btn
        v-for="(btn,index) in links"
        :key="index"
        @click="btn.showDialog=true"
        text
      >
        <v-icon>
          {{btn.icon}}
        </v-icon>
        {{$t(btn.title)}}
        <v-dialog v-model="btn.showDialog" width="500">
          <v-card>
            <v-card-title>
              {{$t(btn.title)}}
            </v-card-title>
            <v-card-text>
              {{$t(btn.content)}}
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-btn>
      <v-col cols="12">
        <a id="for-record">
        Phantom SQL Online Judge</a>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({})
export default class SFooter extends Vue {
  links = [{
    title: 'footer.contact.title',
    icon: 'mdi-ghost',
    showDialog: false,
    content: 'footer.contact.content'
  }, {
    title: 'footer.about.title',
    icon: 'mdi-information-outline',
    showDialog: false,
    content: 'footer.about.content'
  }]
}
</script>

<style scoped lang="scss">
  @import "../../css/variable";

  #s-footer {
    width: $app-width;
    margin: 0 auto;
  }

  #for-record{
    color: black;
    display: block;
    text-align: center;
  }
</style>
