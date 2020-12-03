<template>
  <div class="page-all-root">
    <s-not-found-card/>
  </div>
</template>

<script>
import {Vue} from '@/ts/extension'
import SNotFoundCard from "@/components/SNotFoundCard.vue";
import {Component} from "vue-property-decorator";

@Component({
  components: {SNotFoundCard}
})
export default class SNotFound extends Vue{

}
</script>

<style scoped lang="scss">
</style>
