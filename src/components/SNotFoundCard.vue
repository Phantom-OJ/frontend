<template>
  <v-card class="all-card ErrorPage-container">
    <div>
      <h1 class="Error-title">404</h1>
      <p class="Error-text">你似乎来到了没有知识的荒原</p>
      <v-btn color="secondary">Back to Home</v-btn>
    </div>
    <v-img src="/404.jpg" class="ErrorPage-image"></v-img>
  </v-card>
</template>

<script>
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
@Component({})
export default class SNotFoundCard extends Vue{

}
</script>

<style scoped>
  .ErrorPage-container{
    padding: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .Error-title{
    font-size: 60px;
  }
  .Error-text{
    font-size: 20px;
  }
  .ErrorPage-image{
    max-width: 250px;
  }
</style>
