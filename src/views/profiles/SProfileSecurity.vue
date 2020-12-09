<template>
  <s-profile-security-sheet/>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SProfileSecuritySheet from "@/components/Profile/SProfileSecuritySheet.vue";

@Component({
  components: {SProfileSecuritySheet}
})
export default class SProfileSecurity extends Vue {
}
</script>

<style scoped lang="scss">

</style>
