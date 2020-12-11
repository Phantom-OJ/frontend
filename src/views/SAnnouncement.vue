<template>
  <div class="page-root page-all-root">
    <s-announcement-card :item-num="6"/>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import SAnnouncementCard from "@/components/Announcement/SAnnouncementCard.vue";

@Component({
  components: {SAnnouncementCard}
})
export default class SAnnouncement extends Vue {
}
</script>

<style scoped lang="scss">

</style>
