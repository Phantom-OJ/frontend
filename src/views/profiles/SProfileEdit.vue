<template>
  <s-profile-edit-sheet :user="user"/>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop} from 'vue-property-decorator'
import {User} from "@/ts/user";
import SProfileEditSheet from "@/components/Profile/SProfileEditSheet.vue";

@Component({
  components: {SProfileEditSheet}
})
export default class SProfileEdit extends Vue {
  @Prop({
    type:User,
    required:true
  })
  user!:User
}
</script>

<style scoped lang="scss">

</style>
