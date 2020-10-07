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
            {{user.ID}}
          </p>
          <p class="title-text">
            {{user.group}}
          </p>
        </div>
      </v-card-title>
      <hr class="mx-4"/>
      <v-card-actions>
        <v-list>
          <v-list-item
            v-for="(btn, index) in nav"
            :key="index"
          >
            <v-btn
              text
              :key="index"
              :to="btn.to"
            >
              <v-icon style="margin: 0 10px">
                {{btn.icon}}
              </v-icon>
              {{$t(btn.text)}}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-actions>
      <div style="height: 25%"></div>
      <v-card-actions>
        <div>
          <v-btn
            :to="navUser.profile.to"
            class="user-nav-btn"
          >
            <v-icon>
              {{navUser.profile.icon}}
            </v-icon>
            {{$t(navUser.profile.text)}}
          </v-btn>
          <v-btn
            @click="function(){$store.dispatch(navUser.signOut.event)}"
            class="user-nav-btn"
          >
            <v-icon>
              {{navUser.signOut.icon}}
            </v-icon>
            {{$t(navUser.signOut.text)}}
          </v-btn>
        </div>
      </v-card-actions>
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
    ...mapState(['user', 'nav', 'navUser'])
  }
})
export default class SNavBar extends Vue {
  get hideNav() {
    return this.$store.state.sideNav
  }

  set hideNav(v) {
    console.log('???', v)
    this.$store.commit('setSideNav', {v: v})
  }
}
</script>

<style scoped lang="scss">

  .user-nav-btn{
    margin: 5px 10px;
  }

</style>
