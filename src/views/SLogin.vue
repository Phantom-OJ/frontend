<template>
  <div class="page-all-root">
    <s-login-card/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import SLoginCard from "@/components/SLoginCard.vue";

@Component({
  components: {SLoginCard}
})
export default class SLogin extends Vue{

}
</script>

<style scoped>

</style>
