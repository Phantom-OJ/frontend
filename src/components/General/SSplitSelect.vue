<template>
  <v-card class="s-split-select--root">
    <div class="s-split-select--title">
      <v-btn v-if="isDialog" text absolute right top @click="close">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
      <slot/>
    </div>
    <div class="s-flex s-split-select--body">
      <div class="s-split-select--active__box">
        <slot name="aSearch"/>
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
        <slot name="iSearch"/>
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
    type:Boolean,
    default:true
  })
  isDialog!:boolean
  @Prop()
  activeFilter?:any
  @Prop()
  inactiveFilter?:any
  @Prop()
  filter?:(i:any, j:any)=>boolean

  get activeItems(){
    if(!this.filter) return this.s_active
    return this.s_active.filter(e=>this.filter!(e, this.activeFilter))
  }

  get inactiveItems(){
    if(!this.filter) return this.s_inactive
    return this.s_inactive.filter(e=>this.filter!(e, this.inactiveFilter))
  }

  @Emit()
  activate(entity: any) {
    this.s_inactive.remove(entity)
    this.s_active.push(entity)
  }

  @Emit()
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
  min-width: 400px;
  max-width: 1200px;
  min-height: 630px;
  flex-grow: 1;

  .s-split-select--title {
    min-height: 30px;
    position: relative;
  }

  .s-split-select--body{
    min-height: 600px;
    max-height: 930px;
  }

  .s-split-select--active__box, .s-split-select--inactive__box {
    width: calc(50% - 20px);
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    .s-split-select--active, .s-split-select--inactive {
      padding: 8px 8px;
      border-radius: 16px;
      flex-grow: 1;


      min-height: 600px;
      max-height: 830px;
      overflow: auto;
      .s-split-select--item {
        margin: 6px 6px;
        display: inline-block;
      }
    }

    .s-split-select--active {
      border: 2px solid var(--v-success-lighten1);
      &:hover{
        position: relative;
        background-color: #69cb691f;
      }
    }

    .s-split-select--inactive {
      border: 2px solid var(--v-accent-lighten1);
      &:hover{
        position: relative;
        background-color: #597eff1f;
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
