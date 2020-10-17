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
      <v-list min-width="88">
        <v-list-item
          v-if="!isAuthenticated"
          :to="navUser.login.to"
          class="cursor-hand-hover avatar-list-item"
        >
          {{$t(navUser.login.text)}}
        </v-list-item>
        <v-list-item
          v-if="!isAuthenticated"
          :to="navUser.signUp.to"
          class="cursor-hand-hover avatar-list-item"
        >
          {{$t(navUser.signUp.text)}}
        </v-list-item>
        <v-list-item
          v-if="isAuthenticated"
          :to="navUser.profile.to"
          class="cursor-hand-hover avatar-list-item"
        >
          {{$t(navUser.profile.text)}}
        </v-list-item>
        <v-list-item
          v-if="isAuthenticated"
          @click="$store.dispatch(navUser.signOut.event)"
          class="cursor-hand-hover avatar-list-item"
        >
          {{$t(navUser.signOut.text)}}
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import {mapState} from "vuex";
import {Component, Vue} from 'vue-property-decorator'

@Component({
  props: {
    size: {
      type: Number,
      default: 12
    }
  },
  computed: mapState(['user', 'navUser', 'isAuthenticated'])
})
export default class SAvatar extends Vue {
  push(url: string) {
    this.$router.push(url)
  }
}
</script>

<style scoped lang="scss">
  @import "../css/variable.scss";

  .v-list-item.avatar-list-item {
    font-size: $md-font-size;
    min-height: 2*$md-font-size;
    line-height: 2*$md-font-size;
    display: block;
    text-align: center;
  }
</style>
