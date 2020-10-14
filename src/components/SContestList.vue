<template>
  <div id="root">
    <v-list>
      <v-list-item
      >
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component({
  props:{
    home:{
      type:Boolean,
      default: false
    },
    itemNum:{
      type:Number,
      required:true
    }
  }
})
export default class SContestList extends Vue {

  mounted(){
  }

  get contests(){
    let cInfo = this.$store.state.contestInfo
    if(this.$props.home)
      return cInfo.list.slice(0, this.$props.itemNum)
    else
      return cInfo.list.slice(cInfo.pageIndex*this.$props.itemNum, cInfo.pageIndex)
  }

  get pageIndex(){
    return this.$store.state.contestInfo.pageIndex
  }

  set pageIndex(i){
    this.$store.commit('setContestPageIndex', i)
  }
}
</script>

<style scoped lang="scss">
  #root{

  }
</style>
