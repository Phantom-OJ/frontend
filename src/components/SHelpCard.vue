<template>
  <v-card class="all-card">
    <s-searchable-card-title :title="'help'"></s-searchable-card-title>
    <div class="paragraph" v-if="!showStepper">
      <p>This is a guide for Phantom Online Judge</p>
      <v-btn
        @click="showStepper=true"
        color="primary"
      >
        show step
      </v-btn>
    </div>
    <v-stepper v-if="showStepper" v-model="e1">
      <v-stepper-header>
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
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="300px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 2"
          >
            Continue
          </v-btn>

          <v-btn text @click="showStepper=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="300px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 3"
          >
            Continue
          </v-btn>

          <v-btn text @click="showStepper=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="300px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 4"
          >
            Continue
          </v-btn>

          <v-btn text @click="showStepper=false">
            Cancel
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card
            class="mb-12"
            color="grey lighten-1"
            height="300px"
          ></v-card>

          <v-btn
            color="primary"
            @click="e1 = 1"
          >
            Back
          </v-btn>

          <v-btn text @click="showStepper=false">
            Cancel
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SSearchableCardTitle from "@/components/General/SSearchableCardTitle.vue";

@Component({
  components: {SSearchableCardTitle}
})
export default class SHelpCard extends Vue{
  e1:number=1
  showStepper:boolean=false
}
</script>

<style scoped>
  .v-stepper__header{
    box-shadow: none;
  }
  .v-stepper{
    box-shadow: none;
  }
  .paragraph{
    text-align: center;
    height: 80%;
    margin: 10px auto;
  }
</style>
