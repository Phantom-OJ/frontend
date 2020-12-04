<template>
  <v-card class="all-card ErrorPage-container">
    <v-slide-x-transition>
    <div>
      <h1 class="Error-title">404</h1>
      <p class="Error-text">{{$t("not-found.text")}}</p>
      <v-btn color="secondary" @click="click()">{{$t("not-found.button")}}</v-btn>
    </div>
    </v-slide-x-transition>
    <v-slide-x-transition>
      <v-img src="/404.jpg" class="ErrorPage-image"></v-img>
    </v-slide-x-transition>
  </v-card>
</template>

<script>
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
@Component({})
export default class SNotFoundCard extends Vue{
  click() {
    this.$router.push(`/`)
  }
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
    font-size: 65px;
  }
  .Error-text{
    font-size: 20px;
  }
  .ErrorPage-image{
    max-width: 230px;
  }
</style>
