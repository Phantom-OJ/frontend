<template>
  <div class="page-detail-root">
    <s-profile-card :readonly="false"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SProfileCard from "@/components/Profile/SProfileCard.vue";

@Component({
  components: {SProfileCard}
})
export default class SProfile extends Vue {
}
</script>

<style scoped lang="scss">

</style>
