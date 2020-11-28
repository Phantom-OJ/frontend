<template>
  <div class="page-account-root">
    <s-sign-up-card/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SSignUpCard from "@/components/Profile/SSignUpCard.vue";

@Component({
  components: {SSignUpCard}
})
export default class SSignUp extends Vue {
}
</script>

<style scoped>

</style>
