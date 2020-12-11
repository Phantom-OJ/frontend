<template>
  <div class="s-flex" style="flex-grow: 1">
    <div style="width: 240px; margin: 12px auto;position: relative">
      <v-virtual-scroll height="636" item-height="60" width="320" :items="roles">
        <template v-slot:default="{item}">
          <v-list-item @click="manageRole(item)" dense :class="{'s-item__active':item===role}">
            {{ item }}
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-btn fab absolute @click="addRole" class="s-add-btn" color="secondary">
        <v-icon>
          mdi-plus-thick
        </v-icon>
      </v-btn>
    </div>
    <s-split-select :active.sync="activeUsers" :inactive.sync="inactiveUsers" :is-dialog="false" :default-i-f="role"
      @inactive-search="searchUserI" :filter="userFilter" style="box-shadow: none;width: 200px" :key="role"
      @active-search="searchUserA"
    >
      <template v-slot:aSearch>
        <s-search-user-sheet :search-form="activeUF" :role="false"/>
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
        <s-search-user-sheet :search-form="inactiveUF" :not-role="false"/>
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
import {Component, Emit} from 'vue-property-decorator'
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import {User} from "@/ts/user";
import {mapState} from "vuex";
import {SearchUserForm} from "@/ts/forms";
import SSearchUserSheet from "@/components/General/SSearchUserSheet.vue";

@Component({
  components: {SSearchUserSheet, SSplitSelect},
  computed: {...mapState(['roles'])}
})
export default class SManageRoleSheet extends Vue {
  readonly roles!: string[]

  activeUsers: User[] = []
  activeUF: SearchUserForm = new SearchUserForm()
  inactiveUsers: User[] = []
  inactiveUF: SearchUserForm = new SearchUserForm()
  role: string = ''

  created() {
    this.manageRole(this.roles[0])
  }

  @Emit()
  addRole() {
  }

  async manageRole(r: string) {
    this.role = r
    this.activeUF.role = r
    this.activeUsers = []
    this.inactiveUF.notRole = r
    this.inactiveUsers = []
  }

  userFilter(u: User, str: string) {
    str = str.toUpperCase()
    return u.username.toUpperCase().includes(str) || `${u.ID}`.includes(str) || u.role.toUpperCase().includes(str)
  }

  async searchUserI(filter: string) {
  }

  async searchUserA(filter: string) {
  }
}
</script>

<style scoped lang="scss">

</style>
