<template>
  <v-card class="detail-card">
    <s-refreshable-card-title :title="'admin'" :subtitle="$t('admin.subtitle')" @refresh="load(true)"/>
    <div class="s-admin">
      <v-navigation-drawer
        color="white"
        permanent
        class="s-admin--nav"
        floating
        absolute
        width="162"
      >
        <v-list>
          <v-list-item
            v-for="(text, i) in items"
            :key="i"
            link
            @click="tab = i"
            :class="{'s-admin--nav_act':tab===i}"
          >
            <v-list-item-icon style="margin-right: 8px">
              <v-icon> mdi-minus</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-tabs-items v-model="tab" continuous class="s-admin-tabs s-flex">
        <v-tab-item class="s-flex s-admin-tab" eager>
          <s-manage-group-sheet ref="group"/>
        </v-tab-item>
        <v-tab-item class="s-flex s-admin-tab" eager>
          <s-manage-role-sheet @add-role="tab=3" ref="role"/>
        </v-tab-item>
        <v-tab-item class="s-flex s-admin-tab" eager>
          <s-manage-permission-sheet ref="permission"/>
        </v-tab-item>
        <v-tab-item class="s-flex s-admin-tab" eager>
          <s-manage-announcement-sheet ref="announcement"/>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SRefreshableCardTitle from "@/components/General/SRefreshableCardTitle.vue";
import {User} from "@/ts/user";
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import {mapState} from "vuex";
import SManageRoleSheet from "@/components/Administrator/SManageRoleSheet.vue";
import SManageGroupSheet from "@/components/Administrator/SManageGroupSheet.vue";
import SManagePermissionSheet from "@/components/Administrator/SManagePermissionSheet.vue";
import SManageAnnouncementSheet from "@/components/Administrator/SManageAnnouncementSheet.vue";

@Component({
  components: {
    SManageAnnouncementSheet,
    SManagePermissionSheet, SManageGroupSheet, SManageRoleSheet, SSplitSelect, SRefreshableCardTitle},
  computed: {...mapState(['groups', 'user', 'permissions', 'roles'])}
})
export default class SAdminCard extends Vue {
  readonly user!: User
  readonly keyInState = 'admin'

  get tab(){
    return parseInt(this.$route.hash.slice(1)||'0')
  }

  set tab(v:number){
    //@ts-ignore
    this.$router.replace({
      ...this.$route,
      hash: `#${v}`
    })
  }

  created() {
    this.load()
  }

  mounted() {
    if (this.$route.query.recover) {
      if (!window.state?.[this.keyInState]) return
      for (let stateKey in window.state[this.keyInState]) {
        if (window.state[this.keyInState].hasOwnProperty(stateKey)) {
          //@ts-ignore
          this[stateKey] = window.state[this.keyInState][stateKey]
        }
      }
    }
  }

  async load(force: boolean = false) {
    await Promise.all([this.$store.dispatch('loadGroups', force), this.$store.dispatch('loadPermissions', force),
      this.$store.dispatch('loadTags', force), this.$store.dispatch('loadDBs', force), this.$store.dispatch('loadScripts', force)])
    //@ts-ignore
    this.$refs.group.refresh();this.$refs.role.refresh();this.$refs.permission.refresh();this.$refs.announcement.refresh();
  }

  beforeDestroy() {
    window.state[this.keyInState] = {
      ...this.$data
    }
  }

  get items() {
    return ['profile.group', 'record.searchU', 'admin.permission', 'nav-bar.announcement'].map(s => this.$t(s))
  }
}
</script>

<style lang="scss">
.s-admin {
  min-height: 636px;
  padding-left: 162px;
  position: relative;

  .s-admin--nav .s-admin--nav_act {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .v-window__container {
    flex-grow: 1;
  }

  .s-admin-tabs {
    padding-left: 16px;
    flex-grow: 1;
    overflow: auto;

    .s-admin-tab {
      flex-grow: 1;
    }
  }

  .s-split-select--root {
    padding-right: 12px;
  }
}

</style>
