<template>
  <v-navigation-drawer
    v-model="hideNav"
    app
    temporary
  >
    <v-card flat>
      <v-card-title>
        <v-avatar :size="72" style="margin: 10px 0 10px 10%;display: block">
          <img :src="user.avatar" :alt="user.nickname">
        </v-avatar>
        <div style="margin: 0 0 0 20px">
          <p class="title-text">
            {{ (!!user.nickname)?user.nickname:$t('profile.not-login')}}
          </p>
          <p class="title-text">
            {{ (!!user.groupList)?user.groupList.join(', '):''}}
          </p>
        </div>
      </v-card-title>
      <hr class="mx-4"/>
      <v-card-actions>
        <v-list nav shaped>
          <v-list-item
            v-for="(btn, index) in nav"
            :key="index"
            :to="btn.to"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{btn.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(btn.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="!isAuthenticated"
            :to="`${navUser.login.to}?then=${$route.path}`"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{navUser.login.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.login.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="!isAuthenticated"
            :to="`${navUser.signUp.to}?then=${$route.path}`"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{navUser.signUp.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.signUp.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            :to="`/profile/${user.ID}/home`"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{navUser.profile.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.profile.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            @click="signOut"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{navUser.signOut.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content
              class="nav-content"
            >
              {{$t(navUser.signOut.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isAdmin"
            :to="navUser.admin.to"
          >
            <v-list-item-icon>
              <v-icon class="icon-color-0">
                {{navUser.admin.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.admin.text)}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-actions>
      <div style="height: 25%"></div>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SAvatar from "@/components/Root/SAppBarAvatar.vue"
import {mapState} from "vuex"
import {User} from "@/ts/user";

@Component({
  components: {SAvatar},
  computed: {
    ...mapState(['user', 'nav', 'navUser', 'isAuthenticated'])
  }
})
export default class SNavBar extends Vue {
  readonly user!:User
  readonly isAuthenticated!:boolean

  get hideNav() {
    return this.$store.state.sideNav
  }

  set hideNav(v) {
    this.$store.commit('setSideNav', v)
  }

  async signOut(){
    await this.$api.logOut()
    this.$store.commit('setUser',{isAuthenticated:false})
    await this.$router.push('/')
  }

  get isAdmin(){
    return this.isAuthenticated&&this.user.permissionList.length>0
  }
}
</script>

<style scoped lang="scss">

  .nav-content {
    margin-right: 30px;
  }

</style>
