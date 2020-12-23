<template>
  <div>
    <v-menu
      offset-y
      auto
    >
      <template v-slot:activator="{on, attrs}">
        <v-avatar
          :size="size"
          class="cursor-hand-hover"
          v-on="on"
          v-bind="attrs"
        >
          <img
            :src="user.avatar"
            alt="avatar"
          >
        </v-avatar>
      </template>
      <v-expand-transition>
        <v-list min-width="88">
          <v-list-item
            v-if="!isAuthenticated"
            :to="`${navUser.login.to}?then=${$route.path}`"
            class="cursor-hand-hover avatar-list-item"
          >
            {{ $t(navUser.login.text) }}
          </v-list-item>
          <v-list-item
            v-if="!isAuthenticated"
            :to="`${navUser.signUp.to}?then=${$route.path}`"
            class="cursor-hand-hover avatar-list-item"
          >
            {{ $t(navUser.signUp.text) }}
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            :to="`/profile/${user.ID}/home`"
            class="cursor-hand-hover avatar-list-item"
          >
            {{ $t(navUser.profile.text) }}
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated"
            @click="signOut"
            class="cursor-hand-hover avatar-list-item"
          >
            {{ $t(navUser.signOut.text) }}
          </v-list-item>
          <v-list-item
            v-if="isAuthenticated&&isAdmin"
            :to="navUser.admin.to"
            class="cursor-hand-hover avatar-list-item"
          >
            {{ $t(navUser.admin.text) }}
          </v-list-item>
        </v-list>
      </v-expand-transition>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {mapState} from "vuex";
import {Component, Prop} from 'vue-property-decorator'
import {Permission, User} from "@/ts/user";

@Component({
  computed: mapState(['user', 'navUser', 'isAuthenticated'])
})
export default class SAvatar extends Vue {
  readonly user!: User
  readonly isAuthenticated!: boolean
  @Prop({
    type: Number,
    default: 12
  })
  size!: number

  push(url: string) {
    this.$router.push(url)
  }

  async signOut() {
    await this.$api.logOut()
    this.$store.commit('setUser', {isAuthenticated: false})
    await this.$router.push('/')
  }

  get isAdmin() {
    return this.user.hasPermission(Permission.ALLOWANCE.GRANT_OTHER_USERS)
  }
}
</script>

<style scoped lang="scss">
@import "../../css/variable";

.v-list-item.avatar-list-item {
  font-size: $md-font-size;
  min-height: 2*$md-font-size;
  line-height: 2*$md-font-size;
  display: block;
  text-align: center;
}
</style>
