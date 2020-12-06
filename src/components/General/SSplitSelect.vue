<template>
  <v-card class="s-split-select--root">
    <div class="s-split-select--title">
      <v-btn text absolute right top @click="close">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <slot/>
    </div>
    <div class="s-flex" style="min-height: 800px">
      <div class="s-split-select--active__box">
        <v-text-field :label="$t('search')" v-model="activeFilter" class="s-split-select--search"/>
        <div class="s-split-select--active">
        <span v-for="(entity,index) in activeItems" :key="index" @click="inactivate(entity)" class="s-split-select--item">
          <slot name="active" :entity="entity"/>
        </span>
        </div>
      </div>
      <div class="s-split-select--control">
        <v-icon size="36">
          mdi-arrow-left-right-bold
        </v-icon>
      </div>
      <div class="s-split-select--inactive__box">
        <v-text-field :label="$t('search')" v-model="inactiveFilter" class="s-split-select--search"/>
        <div class="s-split-select--inactive">
        <span v-for="(entity,index) in inactiveItems" :key="index" @click="activate(entity)" class="s-split-select--item">
          <slot name="inactive" :entity="entity"/>
        </span>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Emit, Prop, PropSync} from 'vue-property-decorator'

@Component({})
export default class SSplitSelect extends Vue {
  @PropSync('inactive')
  s_inactive!: Array<any>
  @PropSync('active')
  s_active!: Array<any>
  @Prop({
    type:Function,
    required:true
  })
  filter!:(e:any, filter:string)=>boolean

  activeFilter=''
  inactiveFilter=''

  get activeItems(){
    return this.s_active.filter(e=>this.filter(e, this.activeFilter))
  }

  get inactiveItems(){
    return this.s_inactive.filter(e=>this.filter(e, this.inactiveFilter))
  }

  activate(entity: any) {
    console.log(entity)
    this.s_inactive.remove(entity)
    this.s_active.push(entity)
  }

  inactivate(entity: any) {
    this.s_inactive.push(entity)
    this.s_active.remove(entity)
  }

  @Emit()
  close(){}
}
</script>

<style lang="scss">
.s-split-select--root {
  width: 100%;
  min-height: 830px;

  .s-split-select--title {
    min-height: 30px;
    position: relative;
  }

  .s-split-select--active__box, .s-split-select--inactive__box {
    width: calc(50% - 20px);
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    .s-split-select--search{
      flex-grow: 0;
      padding-top: 0;
    }
    .s-split-select--active, .s-split-select--inactive {
      padding: 8px 8px;
      border-radius: 16px;
      flex-grow: 1;

      .s-split-select--item {
        margin: 6px 6px;
        display: inline-block;
      }
    }

    .s-split-select--active {
      border: 2px solid var(--v-success-lighten1);
      &:hover{
        position: relative;
        &::before{
          content: "";
          position: absolute;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          border-radius: 16px;
          top: -2px;
          left: -2px;
          background-color: var(--v-success-lighten1);
          opacity: 0.1;
          z-index: 0;
        }
      }
    }

    .s-split-select--inactive {
      //background-color: var(--v-accent-lighten1);
      border: 2px solid var(--v-accent-lighten1);
      &:hover{
        position: relative;
        &::before{
          content: "";
          position: absolute;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          border-radius: 16px;
          top: -2px;
          left: -2px;
          background-color: var(--v-accent-lighten1);
          opacity: 0.1;
        }
      }
    }
  }

  .s-split-select--active__box {
    padding-left: 16px;
  }

  .s-split-select--inactive__box {
    padding-right: 16px;
  }

  .s-split-select--control {
    width: 36px;
    margin: 0 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
