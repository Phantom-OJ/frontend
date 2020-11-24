<template>
  <v-card class="all-card">
    <s-refreshable-card-title :title="`help`"/>
    <div class="help-item">
      <div class="help-title">
        <h1>1. QuickStart</h1>
        <v-divider></v-divider>
      </div>
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            Register an account
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            View detail of assignments
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 3"
            step="3"
          >
            Start coding
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">
            View submission results
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card class="step">
              <v-img
                class="help-img"
                max-height="280"
                max-width="450"
                src="@/assets/step1_1.png"
              ></v-img>
              <v-divider vertical></v-divider>
              <div class="help-item-content">
                <h2>Register an account</h2>
                <br>
                <p>(1) Click the default avatar in the navigation bar</p>
                <p>(2) Click "sign up" to go to the sign up interface</p>
                <p>(3) Fill in the form and click "SEND" to get vcode</p>
                <p>(4) Check email for the vcode and click "SUBMIT"</p>
              </div>
            </v-card>

            <div class="step-button">
              <v-btn
                color="primary"
                @click="e1 = 1"
                disabled="true"
              >
                Previous
              </v-btn>
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="step"></v-card>

            <div class="step-button">
              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Previous
              </v-btn>
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="step"></v-card>

            <div class="step-button">
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Previous
              </v-btn>
              <v-btn
                color="primary"
                @click="e1 = 4"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card class="step"></v-card>

            <div class="step-button">
              <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Previous
              </v-btn>
              <v-btn
                color="primary"
                @click="e1 = 1"
              >
                Back
              </v-btn>
              <v-btn
                color="primary"
                @click="e1 = 4"
                disabled="true"
              >
                Continue
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <div class="help-item">
      <div class="help-title">
        <h1>2. Caution for Code Submission</h1>
        <v-divider></v-divider>
      </div>
      <div class="step"></div>
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
    background-color: lavenderblush;
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
