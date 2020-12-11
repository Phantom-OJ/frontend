<template>
  <v-tooltip
    top
    transition="scale-transition"
  >
    <template v-slot:activator="{on,attrs}">
      <div class="s-tag" v-on="on" v-bind="attrs" @click="click" ref="s-tag">
        <v-icon v-if="width_height.width>600" dense>
          {{ icon }}
        </v-icon>
        {{ tag.keyword }}
      </div>
    </template>
    {{ tag.description }}
  </v-tooltip>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {mapState} from "vuex";
import {Tag} from "@/ts/entities";

@Component({
  computed: {
    ...mapState(['width_height'])
  }
})
export default class STag extends Vue {
  @Prop({
    type: Object,
    required: true
  })
  readonly tag!: Tag

  @Prop({
    type: Boolean,
    default: true
  })
  readonly stopClickPropagate!: boolean
  readonly width_height!: { width: number }

  mounted() {
    //@ts-ignore
    let style = this.$refs['s-tag'].style
    style.setProperty('--bgcolor-start', `#${this.color}`)
    style.setProperty('--bgcolor-stop', `#${this.color}42`)
  }

  get color() {
    return this.tag.keyword.hash().format(6)
  }

  get icon() {
    return 'mdi-tag-outline'
  }

  click(e: MouseEvent) {
    if (this.stopClickPropagate) {
      e.stopPropagation();
    }
    this.$emit('click', this.tag.keyword)
  }
}
</script>

<style lang="scss">

@mixin linear-gradient($from, $to) {
  /* Fallback for sad browsers */
  background-color: $to;
  /* Mozilla Firefox */
  background-image: -moz-linear-gradient($from, $to);
  /* Opera */
  background-image: -o-linear-gradient($from, $to);
  /* WebKit (Safari 4+, Chrome 1+) */
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, $from), color-stop(1, $to));
  /* WebKit (Chrome 11+) */
  background-image: -webkit-linear-gradient($from, $to);
  /* IE10 */
  background-image: -ms-linear-gradient($from, $to);
  /* W3C */
  background-image: linear-gradient($from, $to);
}

.s-tag {
  z-index: 1;
  position: relative;
  --bgcolor-start: var(--v-success-lighten1);
  --bgcolor-stop: var(--v-success-lighten4);
  border-radius: 4px;
  padding: 4px 6px;
  height: 32px;
  line-height: 24px;
  box-sizing: border-box;
  margin: 2px 2px;
  overflow: hidden;
  color: #f8f8ff;
  display: inline-block;
  @include linear-gradient(var(--bgcolor-start), var(--bgcolor-stop));

  i {
    color: #f8f8ff !important;
  }
}

</style>
