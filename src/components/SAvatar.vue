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
      <v-list>
        <v-list-item
          :to="navUser.profile.to"
          class="cursor-hand-hover avatar-list-item"
        >
          {{$t(navUser.profile.text)}}
        </v-list-item>
        <v-list-item
          @click="function(){$store.dispatch(navUser.signOut.event)}"
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
  computed: mapState(['user','navUser'])
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
  }
</style>
