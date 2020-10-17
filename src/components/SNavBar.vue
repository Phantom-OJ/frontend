<template>
  <v-navigation-drawer
    v-model="hideNav"
    app
    temporary
  >
    <v-card flat>
      <v-card-title>
        <v-avatar :size="72" style="margin: 10px 0 10px 10%;display: block">
          <img :src="user.avatar">
        </v-avatar>
        <div style="margin: 0 0 0 20px">
          <p class="title-text">
            {{user.name}}
          </p>
          <p class="title-text">
            {{user.group}}
          </p>
        </div>
      </v-card-title>
      <hr class="mx-4"/>
      <v-card-actions>
        <v-list nav shaped>
          <v-list-item
            v-for="(btn, index) in nav"
            :key="index"
            to="btn.to"
          >
            <v-list-item-icon>
              <v-icon color="black">
                {{btn.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(btn.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="!isAuthenticated"
            :to="navUser.login.to"
          >
            <v-list-item-icon>
              <v-icon color="black">
                {{navUser.login.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.login.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="!isAuthenticated"
            :to="navUser.signUp.to"
          >
            <v-list-item-icon>
              <v-icon color="black">
                {{navUser.signUp.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.signUp.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            :to="navUser.profile.to"
          >
            <v-list-item-icon>
              <v-icon color="black">
                {{navUser.profile.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content class="nav-content">
              {{$t(navUser.profile.text)}}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            @click="$store.dispatch(navUser.signOut.event)"
          >
            <v-list-item-icon>
              <v-icon color="black">
                {{navUser.signOut.icon}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content
              class="nav-content"
            >
              {{$t(navUser.signOut.text)}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-actions>
      <div style="height: 25%"></div>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SAvatar from "@/components/SAvatar.vue"
import {mapState} from "vuex"

@Component({
  components: {SAvatar},
  computed: {
    ...mapState(['user', 'nav', 'navUser', 'isAuthenticated'])
  }
})
export default class SNavBar extends Vue {
  get hideNav() {
    return this.$store.state.sideNav
  }

  set hideNav(v) {
    this.$store.commit('setSideNav', v)
  }
}
</script>

<style scoped lang="scss">

  .nav-content {
    margin-right: 30px;
  }

</style>
