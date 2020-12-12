<template>
  <v-card class="all-card ErrorPage-container">
    <div>
      <h1 class="Error-title">403</h1>
      <p class="Error-text">{{$t("forbidden.text")}}</p>
      <v-btn style="margin-right: 5px" color="secondary" @click="clickHome()">{{$t("forbidden.home-button")}}</v-btn>
      <v-btn style="margin-left: 5px" color="secondary" @click="clickBack()">{{$t("forbidden.back-button")}}</v-btn>
    </div>
    <v-img
      src="@/assets/phantom_404.jpg"
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
export default class SForbiddenCard extends Vue{
  clickHome() {
    this.$router.push(`/`)
  }
  clickBack() {
    this.$router.back()
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
  font-size: 80px;
}
.Error-text{
  font-size: 20px;
}
.ErrorPage-image{
  max-width: 270px;
  border-radius: 2%;
}
</style>
