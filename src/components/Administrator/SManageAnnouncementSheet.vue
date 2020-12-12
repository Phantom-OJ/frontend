<template>
  <div class="s-flex s-manage-announce" style="flex-grow: 1">
    <div style="width: 240px; margin: 12px auto;position: relative;">
      <v-virtual-scroll height="636" item-height="60" width="320" :items="announcements">
        <template v-slot:default="{item}">
          <v-list-item @click="manageAnnouncement(item)" dense :class="{'s-item__active':item.ID===announcement.ID}">
            {{ item.ID }}
            <v-icon style="margin: 2px 8px;">
              mdi-bullhorn
            </v-icon>
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
            <v-icon @click="e => delAnnouncement(item, e)">
              mdi-delete-off
            </v-icon>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <v-btn fab absolute @click="addAnnouncement" class="s-add-btn" color="secondary">
        <v-icon>
          mdi-plus-thick
        </v-icon>
      </v-btn>
    </div>
    <div v-if="mode===0" style="min-width: 240px;" class="s-flex s-right--split">
      <div>
        {{ $t('create.announcement') }}
        <v-text-field :label="$t('create.title')" hide-details v-model="addedAnnouncement.title"
                      style="margin: 12px 0;"/>
        <v-textarea v-model="addedAnnouncement.description" :label="$t('create.description')" auto-grow/>
        <v-btn block color="success" @click="submitAddAnnouncement">{{ $t('submit') }}</v-btn>
      </div>
      <s-markdown :markdown="addedAnnouncement.description"/>
    </div>
    <div v-else class="s-flex s-right--split">
      <div>
        <v-text-field v-model="announcement.title" :label="$t('create.title')" hide-details/>
        <v-textarea v-model="announcement.description" :label="$t('create.description')" auto-grow/>
        <v-btn block color="success" @click="submitModifyAnnouncement">{{ $t('submit') }}</v-btn>
      </div>
      <s-markdown :markdown="announcement.description"/>
    </div>
    <v-dialog v-model="flagDialog" max-width="1200">
      <v-card max-width="1200" style="padding: 16px 24px">
        <v-card-title>
          {{ deletedAnnouncement.title }}
        </v-card-title>
        <v-card-text>
          <s-markdown :markdown="deletedAnnouncement.description"/>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="warning" @click="submitDelAnnouncement">{{ $t('delete') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component} from 'vue-property-decorator'
import {Announcement} from "@/ts/entities"
import SSplitSelect from "@/components/General/SSplitSelect.vue"
import SSearchUserSheet from "@/components/General/SSearchUserSheet.vue"
import {AnnouncementForm} from "@/ts/forms"
import {SUtil} from "@/ts/utils"
import SMarkdown from "@/components/General/SMarkdown.vue";

enum Mode {
  ADD, MODIFY
}

@Component({
  components: {SMarkdown, SSearchUserSheet, SSplitSelect}
})
export default class SManageAnnouncementSheet extends Vue {
  announcements: Announcement[] = []
  announcement: Announcement = {} as Announcement
  addedAnnouncement: AnnouncementForm = {
    title: '',
    description: '',
    createDate: Date.now()
  }
  mode: Mode = Mode.ADD
  deletedAnnouncement: Announcement = {} as Announcement
  flagDialog: boolean = false

  async refresh() {
    this.announcements = (await this.$api.searchAnnouncementPage({
      start: 1, end: 1e9, filter: {}
    })).entities
  }

  manageAnnouncement(a: Announcement) {
    this.announcement = a
    this.mode = Mode.MODIFY
  }

  addAnnouncement() {
    this.mode = Mode.ADD
  }

  delAnnouncement(a: Announcement, e: any) {
    this.deletedAnnouncement = a
    this.flagDialog = true
    e.stopPropagation()
  }

  async submitModifyAnnouncement() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.modifyAnnouncement(this.announcement.ID, this.announcement.toForm())
    SUtil.alertIfSuccess(msg, 'success.submit', this)
  }

  async submitAddAnnouncement() {
    const msg = await this.$api.putAnnouncement({...this.addedAnnouncement, createDate: Date.now()})
    SUtil.alertIfSuccess(msg, 'success.upload', this)
  }

  async submitDelAnnouncement() {
    if (!window.confirm(this.$t('warning.warn').toString())) return
    const msg = await this.$api.delAnnouncement(this.deletedAnnouncement.ID)
    SUtil.alertIfSuccess(msg, 'success.delete', this)
  }
}
</script>

<style scoped lang="scss">
.s-manage-announce {
  .s-right, .s-right--split {
    margin-left: 12px;
    padding-top: 32px;
    min-width: 300px;
    width: 300px;
    flex-grow: 1;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      height: 90%;
      width: 1px;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .s-flex.s-right--split {
    position: relative;

    & > *:last-child {
      width: 40%;
      margin-left: 3%;
      margin-bottom: 16px;
      padding: 12px;
      background-color: rgba(0, 0, 0, 0.07);
    }

    & > *:first-child {
      width: 52%;
      padding-left: 3%;
    }
  }
}
</style>
