<template>
  <s-loading v-if="loading"/>
  <v-card v-else class="detail-card">
    <div class="profile-container">
      <div class="profile-left-menu" :style="`width:${width_height.width/5+20}px`">
        <v-avatar :size="width_height.width/5+20">
<!--          <img :src="user.avatar">-->
          <img src="@/assets/view.jpg">
        </v-avatar>
        <h3 style="font-weight: 600;font-size: 32px">
          {{user.nickname}}
        </h3>
        <p style="font-size: 22px;margin-bottom: 32px;" class="ellipsis-col">
          {{user.username}}
        </p>
        <v-btn
          v-for="(item, index) in items"
          :key="index"
          text
          :to="item.to"
          class="profile-menu-btn ellipsis-col"
        >
          <v-icon class="profile-menu-btn-icon">
            {{item.icon}}
          </v-icon>
          {{$t(item.title)}}
        </v-btn>
      </div>
      <router-view/>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import SAvatar from "@/components/Root/SAppBarAvatar.vue";
import {User} from "@/ts/user";
import SLoading from "@/components/General/SLoading.vue";
import {mapState} from "vuex";

@Component({
  components: {SLoading, SAvatar},
  computed: mapState(['width_height'])
})
export default class SProfileCard extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  readonly readonly!: boolean
  readonly width_height!: { width: number }

  s_readonly = false
  user!: User
  loading: boolean = true
  readonly items = [{
    icon:'mdi-book-open-variant',
    title: 'profile.home',
    to: './home'
  },{
    icon: 'mdi-pencil',
    title: 'profile.edit',
    to: './edit'
  },{
    icon: 'mdi-shield-edit',
    title: 'profile.security',
    to: './security'
  }]

  created() {
    if (!this.isSelf) {
      this.loadUser()
    } else {
      this.user = this.$store.state.user
    }
    this.s_readonly = this.readonly || !this.isSelf
  }

  mounted() {
    if (this.isSelf) {
      this.loading = false
    }
  }

  get uid() {
    return parseInt(this.$route.params.uid)
  }

  get isSelf() {
    return this.$store.state.user.ID === this.uid
  }

  async loadUser(force: boolean = false) {
    if (!!this.user || force) {
      this.loading = true
      this.user = await this.$api.queryUser(this.uid)
      this.loading = false
    }
  }

}
</script>

<style lang="scss">
.profile-container {
  padding: 10px 20px 32px 32px;
  display: flex;

  .profile-left-menu{
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    position: relative;
    .profile-menu-btn{
      position: relative;
      text-align: left;
      padding: 30px 0 30px 30%;

      @media screen and (max-width: 1500px){
        &{
          padding-left: 25%;
        }
        .v-btn__content{
          width: 75%;
        }
      }
      @media screen and (max-width: 1350px){
        &{
          padding-left: 20%;
        }
        .v-btn__content{
          width: 80%;
        }
      }
      @media screen and (max-width: 1200px){
        &{
          padding-left: 15%;
        }
        .v-btn__content{
          width: 85%;
        }
      }
      @media screen and (max-width: 900px){
        & {
          padding-left: 5%;
        }
        .v-btn__content{
          width: 95%;
        }
      }
      margin: 6px 0;
      &:last-child{
        margin-bottom: 0;
      }
      &.v-btn--active::before{
        opacity: 0.05;
      }
      .v-btn__content{
        display: inline;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 70%;
      }
      .profile-menu-btn-icon{
        margin-right: 10px;
        //position: absolute;
        //left: 45%;
      }
    }
  }
}
</style>
