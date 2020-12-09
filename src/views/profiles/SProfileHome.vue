<template>
  <s-profile-home-sheet/>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SProfileHomeSheet from "@/components/Profile/SProfileHomeSheet.vue";


@Component({
  components: {SProfileHomeSheet}
})
export default class SProfileHome extends Vue {
}
</script>

<style scoped lang="scss">

</style>
