<template>
  <div class="pagination-container">
    <v-pagination :length="Math.ceil(maxLength/itemNum)" circle v-model="sPageIndex" :total-visible="7"
                  style="display: inline-block" class="pagination-nav">
    </v-pagination>
    <div class="pagination-input-container">
      <input type="number" class="pagination-input" v-model.number="sPageIndex">
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, PropSync} from 'vue-property-decorator'
import {Alert} from "@/ts/entries";

@Component({})
export default class SPagination extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  readonly maxLength!: number

  @Prop({
    type: Number,
    required: true
  })
  readonly itemNum!: number

  @PropSync('pageIndex')
  _pageIndex!: number

  get sPageIndex() {
    return this._pageIndex
  }

  set sPageIndex(index: number) {
    if(index.toString().length===0){
      return;
    }
    if (index > this.maxPageNum || index <= 0 || index === void 0) {
      this.$alert(new Alert({type: 'error', info: this.$t('error.pageIndex').toString()}))
      return
    }
    this._pageIndex = index
  }

  get maxPageNum(): number {
    return Math.ceil(this.maxLength / this.itemNum)
  }
}
</script>

<style lang="scss">
  .v-pagination__item:focus, .v-pagination__navigation:focus {
    outline: none !important;
  }

  .v-application .v-pagination .v-pagination__item--active {
    color: var(--v-secondary-darken3) !important;
    background-color: var(--v-secondary-base) !important;
  }

  button.v-pagination__navigation, button.v-pagination__item {
    width: 40px;
    height: 40px;
  }

  ul.v-pagination, ul.v-pagination--circle {
    padding: 5px 0;
  }

  button.v-pagination__navigation, button.v-pagination__item, button.v-pagination__item--active {
    font-size: 12px;
  }


  .pagination-container {
    max-width: 100% !important;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    width: 480px;

    .pagination-nav {
      flex-shrink: 0;

      .v-pagination.v-pagination--circle {
        li > button {
          margin: 4.8px 3px;
          width: 36px;
          height: 36px;
        }
      }
    }

    .pagination-input-container {

      .pagination-input {
        width: 36px;
        height: 36px;
        text-align: center;
        border-radius: 50%;
        box-sizing: content-box;
        font-size: 12px;
        flex-grow: 1;
        margin: 4.8px 10px;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      }
    }
  }
</style>
