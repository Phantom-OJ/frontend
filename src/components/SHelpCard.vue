<template>
  <v-card class="all-card">
    <s-refreshable-card-title :title="`help`"/>
    <div class="help-item">
      <div class="help-title">
        <h1>{{$t("help.title1")}}</h1>
        <v-divider></v-divider>
      </div>
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            {{$t("help.step1.title")}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            {{$t("help.step2.title")}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 3"
            step="3"
          >
            {{$t("help.step3.title")}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">
            {{$t("help.step4.title")}}
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="step">
              <v-img
                class="help-img"
                max-height="280"
                max-width="450"
                :src="$t('help.step1.img')"
              ></v-img>
              <div class="help-item-content">
                <h2>{{$t("help.step1.title")}}</h2>
                <br>
                <p v-for="item in step1Content" :key="item">
                  {{ item }}
                </p>
              </div>
            </v-card>

            <div class="step-button">
              <v-btn color="primary" @click="e1 = 1" :disabled="true">{{$t("help.button-prev")}}</v-btn>
              <v-btn color="primary" @click="e1 = 2">{{$t("help.button-cont")}}</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="step">

            </v-card>

            <div class="step-button">
              <v-btn color="primary" @click="e1 = 1">{{$t("help.button-prev")}}</v-btn>
              <v-btn color="primary" @click="e1 = 3">{{$t("help.button-cont")}}</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="step">

            </v-card>

            <div class="step-button">
              <v-btn color="primary" @click="e1 = 2">{{$t("help.button-prev")}}</v-btn>
              <v-btn color="primary" @click="e1 = 4">{{$t("help.button-cont")}}</v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="step">

            </v-card>

            <div class="step-button">
              <v-btn color="primary" @click="e1 = 3">{{$t("help.button-prev")}}</v-btn>
              <v-btn color="primary" @click="e1 = 1">{{$t("help.button-back")}}</v-btn>
              <v-btn color="primary" @click="e1 = 4" :disabled="true">{{$t("help.button-cont")}}</v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <div class="help-item">
      <div class="help-title">
        <h1>{{$t("help.title2")}}</h1>
        <v-divider></v-divider>
      </div>
      <div class="step">
        <p>{{$t("help.content2")}}</p>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";

@Component({
  components: {SRefreshableCardTitle}
})
export default class SHelpCard extends Vue{
  e1:number=1
  created() {
    console.log(this.$t('help.step1.content'))
  }
  get step1Content(){
    return ["1","2","3","4","5"].map(i => this.$t(`help.step1.content.s${i}`))
  }
}
</script>

<style scoped>
  .help-item{
    margin: 10px 25px;
  }
  .help-title{
    margin-bottom: 10px;
  }
  .step{
    padding: 10px;
    margin-bottom: 10px;
    background-color: aliceblue;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }
  .help-img{

  }
  .help-item-content{
    text-align: left;
  }
  .step-button{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
