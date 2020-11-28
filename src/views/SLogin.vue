<template>
  <div class="page-account-root">
    <s-login-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SLoginCard from "@/components/Profile/SLoginCard.vue";

@Component({
  components: {SLoginCard}
})
export default class SLogin extends Vue{

}
</script>

<style scoped>

</style>
