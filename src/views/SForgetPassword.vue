<template>
  <div class="page-account-root">
    <s-forget-password-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SForgetPasswordCard from "@/components/Profile/SForgetPasswordCard.vue";

@Component({
  components: {SForgetPasswordCard}
})
export default class SForgetPassword extends Vue {
}
</script>

<style scoped lang="scss">

</style>
