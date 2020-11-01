<template>
  <v-card-title id="searchable-card-title">
    <div style="flex-grow: 1">
      {{$t(`nav-bar.${title}`).toUpperCase()}}
      <v-card-subtitle v-if="width_height.width>580" style="display: inline-block">
        True mastery of any skill takes a lifetime
      </v-card-subtitle>
    </div>
    <div class="search">
      <v-text-field color="secondary" outlined hide-details class="search-input" :label="$t(`${title}.search`)"
                    type="text" dense v-model="searchContent"></v-text-field>
      <v-btn class="search-btn" @click="$emit('search',{searchContent})">filter</v-btn>
    </div>
    <v-btn text class="refresh">
      <v-icon class="icon-color-2">mdi-sync</v-icon>
    </v-btn>
  </v-card-title>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";

@Component({
  computed: {
    ...mapState(['width_height'])
  }
})
export default class SSearchableCardTitle extends Vue {
  @Prop({
    type: String,
    required: true
  })
  title!: string

  searchContent: string = ''

}
</script>

<style lang="scss">
  #searchable-card-title {
    padding: 24px 64px 6px 28px;
    display: flex;
    justify-content: flex-end;
  }

  .search {
    width: 200px;
    min-width: 100px;

    .v-input.search-input {
      max-width: 50%;
      min-width: 100px;
      display: inline-block;
      flex: none;

      * {
        color: var(--v-secondary-darken1) !important;
      }
    }

    .search-btn {
      min-width: 50px;
      max-width: 100px;
      display: inline-block;
      flex: none;
      height: 40px !important;
      background-color: var(--v-accent-base) !important;
      margin-left: 10px;
    }
  }

  .refresh.v-btn {
    position: absolute;
    right: 16px;
    min-width: 36px !important;
    padding: 8px !important;
  }
</style>
