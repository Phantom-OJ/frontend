<template>
  <div class="page-all-root">
    <s-forbidden-card/>
  </div>
</template>

<script>
import {Vue} from '@/ts/extension'
import SForbiddenCard from "@/components/SForbiddenCard.vue";
import {Component} from "vue-property-decorator";

@Component({
  components: {SForbiddenCard}
})
export default class SForbidden extends Vue{

}
</script>

<style scoped lang="scss">
</style>
