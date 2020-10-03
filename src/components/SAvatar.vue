<template>
  <div>
    <v-menu
      offset-y
      open-on-hover
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
            v-if="avatar.exist"
            :src="avatar.src"
            alt="avatar"
            @click="push(`/user/${user.ID}`)"
          >
        </v-avatar>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index" @click="item.onClick"
          class="cursor-hand-hover avatar-list-item"
        >
          {{item.title}}
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
    },
    items: {
      type: Array,
      default: () => [{title: 'settings', onClick: () => console.log('settings')}]
    }
  },
  computed: mapState(['user', 'avatar'])
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
