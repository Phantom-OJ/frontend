<template>
  <div class="s-flex" style="flex-grow: 1">
    <div style="width: 240px; margin: 12px auto;position: relative">
      <v-virtual-scroll height="636" item-height="60" width="320" :items="groups">
        <template v-slot:default="{item}">
          <v-list-item @click="manageGroup(item)" dense :class="{'s-item__active':item.ID===group.ID}">
            <v-list-item-action>
              {{ item.ID }}
            </v-list-item-action>
            <v-icon style="margin: 2px 6px;">
              mdi-account-multiple
            </v-icon>
            <v-list-item-content>
              {{ item.description }}
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-btn fab absolute @click="addGroup" class="s-add-btn" color="secondary">
        <v-icon>
          mdi-plus-thick
        </v-icon>
      </v-btn>
    </div>
    <div v-if="flagAddGroup" style="min-width: 240px;margin: 12px auto;">
      {{ $t('create.group') }}
      <v-text-field :label="$t('profile.group')" hide-details v-model="group.description"
                    style="margin: 12px 0;"/>
      <v-btn block color="success">{{ $t('submit') }}</v-btn>
    </div>
    <s-split-select
      v-else :active.sync="activeUsers" :inactive.sync="inactiveUsers" :is-dialog="false"
      style="box-shadow: none;width: 200px"
    >
      <template v-slot:aSearch>
        <s-search-user-sheet :search-form.sync="activeUF" :group="false"/>
      </template>
      <template v-slot:active="{entity}">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="entity.avatar" :alt="entity.username">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ entity.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ entity.role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:iSearch>
        <s-search-user-sheet :search-form.sync="inactiveUF" :not-group="false"/>
      </template>
      <template v-slot:inactive="{entity}">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="entity.avatar" :alt="entity.username">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ entity.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ entity.role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card-title style="padding-bottom: 0">{{$t('select.user')}} ({{ $t('warning.l50') }})</v-card-title>
      <v-btn color="success" absolute right top>{{ $t('submit') }}</v-btn>
    </s-split-select>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import {mapState} from "vuex";
import {Group, User} from "@/ts/user";
import {SearchUserForm} from "@/ts/forms";
import SSearchUserSheet from "@/components/General/SSearchUserSheet.vue";

@Component({
  components: {SSearchUserSheet, SSplitSelect},
  computed: {...mapState(['groups', 'roles'])}
})
export default class SManageGroupSheet extends Vue {
  readonly groups!: Group[]
  readonly roles!: string[]
  flagAddGroup: boolean = false

  activeUsers: User[] = []
  activeUF = new SearchUserForm()
  inactiveUsers: User[] = []
  inactiveUF = new SearchUserForm()
  group: Group = {
    ID: -1,
    description: ''
  }

  async created() {
    await this.$store.dispatch('loadGroups', {vue: this})
    await this.manageGroup(this.groups[0])
  }

  async manageGroup(g: Group) {
    this.group = g
    this.activeUF.group = g.ID
    this.activeUsers = []
    this.inactiveUF.notGroup = g.ID
    this.inactiveUsers = []
    this.flagAddGroup = false
  }

  addGroup() {
    this.flagAddGroup = true
    this.group = {
      ID: -1,
      description: ''
    }
  }

  searchUser(filter: string) {
    console.log(filter)
  }
}
</script>

<style lang="scss">
</style>
