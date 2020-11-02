<template>
  <v-card-title id="searchable-card-title">
    <div style="flex-grow: 3;margin-right: 10px">
      {{$t(`nav-bar.${title}`).toUpperCase()}}
      <v-card-subtitle v-if="width_height.width>580" style="display: inline-block">
        True mastery of any skill takes a lifetime
      </v-card-subtitle>
    </div>
    <slot></slot>
    <v-btn text class="refresh">
      <v-icon class="icon-color-2">mdi-sync</v-icon>
    </v-btn>
  </v-card-title>
</template>

<script lang="ts">
import {Component, Prop, PropSync, Vue, Watch} from 'vue-property-decorator'
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
  readonly title!: string
}
</script>

<style lang="scss">
  #searchable-card-title {
    padding: 24px 58px 6px 28px;
    display: flex;
    justify-content: flex-start;
  }

  .refresh.v-btn {
    position: absolute;
    right: 16px;
    min-width: 36px !important;
    padding: 8px !important;
  }
</style>
