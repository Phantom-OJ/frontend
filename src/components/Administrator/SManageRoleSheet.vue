<template>
  <div class="s-flex" style="flex-grow: 1">
    <div style="width: 300px; margin: 12px auto;position: relative">
      <v-virtual-scroll height="636" item-height="60" width="300" :items="roles">
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
    <s-split-select :active.sync="activeUsers" :inactive.sync="inactiveUsers" :is-dialog="false"
                    @inactivate="inactivate"
                    :filter="()=>true" style="box-shadow: none;width: 200px" :key="role" @activate="activate"
    >
      <template v-slot:aSearch>
        <s-search-user-sheet :search-form="activeUF" :role="false" @search="searchUserA"/>
      </template>
      <template v-slot:active="{entity}">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="entity.avatar" :alt="entity.username">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ entity.username }}</v-list-item-title>
            <v-list-item-subtitle style="color: var(--v-warning-base);font-weight: 700">
              {{ entity.role }}
              <br>
              {{ entity.groupList.join(' ') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template v-slot:iSearch>
        <s-search-user-sheet :search-form="inactiveUF" :not-role="false" @search="searchUserI"/>
      </template>
      <template v-slot:inactive="{entity}">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="entity.avatar" :alt="entity.username">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ entity.username }}</v-list-item-title>
            <v-list-item-subtitle style="color: var(--v-warning-base);font-weight: 700">
              {{ entity.role }}
              <br>
              {{ entity.groupList.join(' ') }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-card-title style="padding-bottom: 0">{{ $t('select.user') }} ({{ $t('warning.l50') }})</v-card-title>
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
import {Alert} from "@/ts/entities";

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

  refresh() {
    this.manageRole(this.roles[0])
  }

  @Emit()
  addRole() {
  }

  async manageRole(r: string) {
    this.activeUF.role = r
    this.activeUsers = []
    this.inactiveUF.notRole = r
    this.inactiveUsers = []
    await Promise.all([this.searchUserA(), this.searchUserI()])
    this.role = r
  }

  async searchUserI() {
    this.inactiveUsers = await this.$api.searchUser(this.inactiveUF)
  }

  async searchUserA() {
    this.activeUsers = await this.$api.searchUser(this.activeUF)
  }

  async activate(u: User) {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    let form = {} as { [key: string]: number[] }
    form[this.role] = [u.ID]
    const msg = await this.$api.grant(form)
    if (msg.toUpperCase().trim() === 'SUCCESS') {
      this.$alert(new Alert({
        type: 'success',
        info: this.$t('success.submit').toString()
      }))
      await this.manageRole(this.role)
    }
  }

  async inactivate(u: User) {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    let form = {} as { [key: string]: number[] }
    form['ROLE_STUDENT'] = [u.ID]
    const msg = await this.$api.grant(form)
    if (msg.toUpperCase().trim() === 'SUCCESS') {
      this.$alert(new Alert({
        type: 'success',
        info: this.$t('success.submit').toString()
      }))
      await this.manageRole(this.role)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
