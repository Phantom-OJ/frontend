<template>
  <div class="s-s-user s-flex flex-start">
    <v-text-field :label="$t('profile.username')" v-model="userSF.username"/>
    <v-select v-if="group" :items="groups_" :label="$t('profile.group')" v-model="group_"/>
    <v-select v-if="notGroup" :items="groups_" :label="`${$t('not')} ${$t('profile.group')}`" v-model="nGroup_"/>
    <v-select v-if="role" v-model="userSF.role" :items="roles_" :label="$t('admin.role')"/>
    <v-select v-if="notRole" v-model="userSF.notRole" :items="roles_" :label="`${$t('not')} ${$t('admin.role')}`"/>
    <v-btn color="secondary" @click="search" style="margin-right: 0">{{ $t('search') }}</v-btn>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Emit, Prop, PropSync} from 'vue-property-decorator'
import {SearchUserForm} from "@/ts/forms";
import {mapState} from "vuex";
import {Group} from "@/ts/user";

@Component({
  computed: {...mapState(['groups', 'roles'])}
})
export default class SSearchUserSheet extends Vue {
  readonly groups!: Group[]
  readonly roles!: string[]
  @PropSync('searchForm')
  userSF!: SearchUserForm
  @Prop({type: Boolean, default: true})
  group!: boolean
  @Prop({type: Boolean, default: true})
  notGroup!: boolean
  @Prop({type: Boolean, default: true})
  role!: boolean
  @Prop({type: Boolean, default: true})
  notRole!: boolean

  get group_(){
    return this.groups.find(g=> g.ID === this.userSF.group)!
  }

  set group_(g:Group){
    this.userSF.group = g.ID
  }

  get nGroup_(){
    return this.groups.find(g=> g.ID === this.userSF.notGroup)!
  }

  set nGroup_(g:Group){
    this.userSF.notGroup = g.ID
  }

  get groups_() {
    return [new Group({id: 0, description: ''}), ...this.groups]
  }

  get roles_() {
    return ['', ...this.roles]
  }

  @Emit()
  search() {
  }
}
</script>

<style lang="scss">
.s-s-user {
  //max-width: 260px;
  & > * {
    max-width: 210px;
    margin-right: 16px;
  }

  & > *:last-child {
    margin-bottom: 16px;
  }
}
</style>
