<template>
  <v-card class="all-card ErrorPage-container">
    <div>
      <h1 class="Error-title">404</h1>
      <p class="Error-text">{{$t("not-found.text")}}</p>
      <v-btn color="secondary" @click="click()">{{$t("not-found.button")}}</v-btn>
    </div>
    <v-img
      src="/phantom_404.jpg"
      class="ErrorPage-image"
    ></v-img>
  </v-card>
</template>

<script>
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {mapState} from "vuex";

@Component({
  computed:{
    ...mapState(['width_height'])
  }
})
export default class SNotFoundCard extends Vue{
  click() {
    this.$router.push(`/`)
  }
}
</script>

<style scoped>
  .ErrorPage-container{
    padding: 80px 100px;
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
    max-width: 270px;
    border-radius: 2%;
  }
</style>
