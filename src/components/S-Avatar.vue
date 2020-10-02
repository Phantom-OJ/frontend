<template>
  <v-menu offset-y>
    <template v-slot:activator>
      <v-avatar :size="size" class="cursor-hand-hover">
        <router-link :to="`\\user\\${this.$store.userID}`">
          <img v-if="avaData.exist" :src="avaData.src" alt="avatar">
        </router-link>
      </v-avatar>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" @click="item.onClick" class="cursor-hand-hover">
        {{item.title}}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {AvatarData} from "@/assets/DataDef"
import {Component, Vue} from 'vue-property-decorator'

@Component({
  name: 's-avatar',
  props: {
    size: {
      type: Number,
      default: 12
    },
    avaData: {
      type: AvatarData,
      default: () => {
        return
      }
    },
    items: {
      type: Array,
      default: () => [{title: 'settings', onClick: () => console.log('settings')}]
    }
  }
})
export default class S_Avatar extends Vue {
}
</script>

<style scoped lang="scss">
  @import "../assets/global.scss";
</style>
