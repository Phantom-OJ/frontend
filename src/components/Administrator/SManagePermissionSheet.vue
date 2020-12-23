<template>
  <div class="s-flex space-around" style="flex-grow: 1">
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
    <div v-if="flagAddRole" class="s-add-role">
      <v-text-field :label="$t('admin.role')" hide-details v-model="roleForm.role"
                    style="margin: 12px 0;"/>
      <v-select v-model="roleForm.allowance" :items="permissions_"/>
      <v-btn block color="success" @click="submitNewRole">{{ $t('submit') }}</v-btn>
    </div>
    <s-split-select
      v-else :active.sync="activePermissions" :inactive.sync="inactivePermissions" :is-dialog="false"
      style="box-shadow: none;width: 200px" prevent-default @activate="activate"
      @inactivate="inactivate"
    >
      <template v-slot:active="{entity}">
        <div class="s-permission">
          <v-icon>
            mdi-license
          </v-icon>
          {{ entity }}
        </div>
      </template>
      <template v-slot:inactive="{entity}">
        <div class="s-permission">
          <v-icon>
            mdi-license
          </v-icon>
          {{ entity }}
        </div>
      </template>
      <v-card-title style="padding-bottom: 0">{{ $t('select.permission') }}</v-card-title>
    </s-split-select>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SSplitSelect from "@/components/General/SSplitSelect.vue";
import {mapState} from "vuex";
import {Permission} from "@/ts/user";
import {SUtil} from "@/ts/utils";
import {Alert} from "@/ts/entities";

@Component({
  components: {SSplitSelect},
  computed: {...mapState(['roles', 'permissions'])}
})
export default class SManagePermissionSheet extends Vue {
  readonly roles!: string[]
  readonly permissions!: Permission[]

  activePermissions: string[] = []
  inactivePermissions: string[] = []

  flagAddRole: boolean = false
  roleForm: { allowance: string, role: string } = {} as { allowance: string, role: string }
  role: string = ''

  refresh() {
    this.manageRole(this.roles[0])
  }

  get permissions_() {
    return [...new Set(this.permissions.map(e => e.allowance)).values()]
  }

  manageRole(r: string) {
    this.role = r
    this.activePermissions = this.originPermissions(r).map(p => p.allowance)
    this.inactivePermissions = SUtil.difference(this.permissions_, this.activePermissions)
    this.flagAddRole = false
  }

  originPermissions(r: string): Permission[] {
    return this.permissions.filter(p => p.role === r)
  }

  addRole() {
    this.role = ''
    this.roleForm = {
      allowance: this.permissions_[0],
      role: 'ROLE_'
    }
    this.flagAddRole = true
  }

  async submitNewRole() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.putPermission({
      ...this.roleForm, id: 0
    })
    if (msg.toUpperCase().trim() === 'SUCCESS') {
      this.$alert(new Alert({
        type: 'success',
        info: this.$t('success.submit').toString()
      }))
      await this.$store.dispatch('loadPermissions', true)
    }
  }

  async activate(item: string) {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.putPermission({
      role: this.role, allowance: item, id: 0
    })
    SUtil.alertIfSuccess(msg, 'success.submit', this)
    await this.$store.dispatch('loadPermissions', true)
  }

  async inactivate(item: string) {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.delPermission(this.originPermissions(this.role).find(p => p.allowance === item)?.id ?? -1)
    SUtil.alertIfSuccess(msg, 'success.delete', this)
    await this.$store.dispatch('loadPermissions', true)
  }
}
</script>

<style scoped lang="scss">
.s-add-role {
  min-width: 240px;
  max-width: 300px;
  margin: 12px auto;
  padding-left: 15px;
  position: relative;
  flex-grow: 1;

  &::before {
    position: absolute;
    left: -5px;
    height: 100%;
    content: "";
    width: 1px;
    background-color: rgba(0, 0, 0, 0.8);
  }
}
</style>
