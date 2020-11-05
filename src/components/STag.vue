<template>
  <span class="s-tag" @click="click" ref="s-tag">
    <v-icon v-if="width_height.width>600" dense>
      {{icon}}
    </v-icon>
    {{tag}}
    <slot/>
  </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {mapState} from "vuex";

@Component({
  computed:{
    ...mapState(['width_height'])
  }
})
export default class STag extends Vue {
  @Prop({type:String, required:true})
  readonly tag!: string
  @Prop({type:String, required:false})
  readonly to?: string
  @Prop({type:String, default:`mdi-tag-outline`})
  readonly icon!: string
  @Prop({type:String, default:`var(--v-success-lighten1)`})
  readonly color!: string

  readonly width_height!: {width:number}

  created(){
  }

  mounted(){
    //@ts-ignore
    let style = this.$refs['s-tag'].style
    style.setProperty('--bgcolor-start',`#${this.color}`)
    style.setProperty('--bgcolor-stop',`#${this.color}42`)
  }

  click(e:MouseEvent){
    e.stopPropagation();
    if(!!this.to){
      this.$router.push(this.to)
    }else{
      this.$emit('click', this.tag)
    }
  }
}
</script>

<style lang="scss">

  @mixin linear-gradient($from, $to) {
    /* Fallback for sad browsers */
    background-color: #51b0ff;
    background-color: $to;
    /* Mozilla Firefox */
    background-image:-moz-linear-gradient($from, $to);
    /* Opera */
    background-image:-o-linear-gradient($from, $to);
    /* WebKit (Safari 4+, Chrome 1+) */
    background-image:-webkit-gradient(linear, left top, left bottom, color-stop(0, $from), color-stop(1, $to));
    /* WebKit (Chrome 11+) */
    background-image: -webkit-linear-gradient($from, $to);
    /* IE10 */
    background-image: -ms-linear-gradient($from, $to);
    /* W3C */
    background-image: linear-gradient($from, $to);
  }

  .s-tag{
    --bgcolor-start: var(--v-success-lighten1);
    --bgcolor-stop: var(--v-success-lighten4);
    border-radius: 2px;
    padding: 4px 6px;
    height: 32px;
    line-height: 24px;
    box-sizing: border-box;
    margin: 2px 2px;
    overflow: hidden;
    color: #f8f8ff;
    @include linear-gradient(var(--bgcolor-start),var(--bgcolor-stop));
    i{
      color: #f8f8ff !important;
    }
  }

</style>
