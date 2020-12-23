<template>
  <s-loading v-if="loading" class="detail-card"/>
  <v-card v-else class="detail-card">
    <div class="profile-container">
      <v-navigation-drawer
        v-if="width_height.width>=1000"
        hide-overlay
        permanent
        :width="Math.max(width_height.width/5+40, 300)"
      >
        <div class="profile-left-menu" :style="`width:${Math.max(width_height.width/5+20, 300)}px;`">
          <v-avatar :size="Math.max(width_height.width/5+20, 236)">
            <img :src="user.avatar" :alt="user.nickname">
          </v-avatar>
          <h3 style="font-weight: 600;font-size: 32px">
            {{ user.nickname }}
          </h3>
          <p style="font-size: 22px;margin-bottom: 18px;" class="ellipsis-col">
            {{ user.username }}
          </p>
          <p style="font-size: 16px;font-weight: 100;margin-bottom: 26px" class="ellipsis-col">
            {{ user.role }}
            <br v-if="user.role.length>0">
            {{ $t('profile.group') }}: {{ user.groupList.map(g => g.description).join(', ') }}
          </p>
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            text
            :to="item.to"
            class="profile-menu-btn ellipsis-col"
          >
            <v-icon class="profile-menu-btn-icon">
              {{ item.icon }}
            </v-icon>
            {{ $t(item.title) }}
          </v-btn>
        </div>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-else
        v-model="drawer"
        absolute
        width="300"
      >
        <div class="profile-left-menu" style="width:300px;padding:32px;">
          <v-avatar :size="236">
            <img :src="user.avatar" :alt="user.nickname">
          </v-avatar>
          <h3 style="font-weight: 600;font-size: 32px">
            {{ user.nickname }}
          </h3>
          <p style="font-size: 22px;margin-bottom: 18px;" class="ellipsis-col">
            {{ user.username }}
          </p>
          <p style="font-size: 16px;font-weight: 100;margin-bottom: 26px" class="ellipsis-col">
            {{ user.role }}
            <br v-if="user.role.length>0">
            {{ $t('profile.group') }}: {{ user.groupList.map(g => g.description).join(', ') }}
          </p>
          <v-btn
            v-for="(item, index) in items"
            :key="index"
            text
            :to="item.to"
            class="profile-menu-btn ellipsis-col"
          >
            <v-icon class="profile-menu-btn-icon">
              {{ item.icon }}
            </v-icon>
            {{ $t(item.title) }}
          </v-btn>
        </div>
      </v-navigation-drawer>
      <v-btn v-if="width_height.width<1000" text absolute left top @click="drawer = !drawer">
        <v-icon>
          mdi-format-list-bulleted
        </v-icon>
      </v-btn>
      <div style="flex-grow: 10">
        <router-view :user="user"/>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import {Vue} from '@/ts/extension'
import {Component, Prop, Watch} from 'vue-property-decorator'
import SAvatar from "@/components/Root/SAppBarAvatar.vue";
import {User} from "@/ts/user";
import SLoading from "@/components/General/SLoading.vue";
import {mapState} from "vuex";

@Component({
  components: {SLoading, SAvatar},
  computed: mapState(['width_height'])
})
export default class SProfileCard extends Vue {
  @Prop({
    type: Boolean,
    default: true
  })
  readonly readonly!: boolean
  readonly width_height!: { width: number }

  drawer: boolean = false
  s_readonly = false
  user_: User | boolean = false
  loading: boolean = true
  readonly items_ = [{
    icon: 'mdi-book-open-variant',
    title: 'profile.home',
    to: './home'
  }, {
    icon: 'mdi-pencil',
    title: 'profile.edit',
    to: './edit'
  }, {
    icon: 'mdi-shield-edit',
    title: 'profile.security',
    to: './security'
  }]

  get items() {
    return this.isSelf ? this.items_ : this.items_.slice(0, 1)
  }

  @Watch('width_height.width')
  widthChange(){
    this.drawer = true
  }

  created() {
    if (!this.isSelf) {
      this.loadUser()
    }
    this.s_readonly = this.readonly || !this.isSelf
  }

  mounted() {
    if (this.isSelf) {
      this.loading = false
    }
  }

  get user() {
    if (!this.isSelf) {
      return this.user_
    } else {
      return this.$store.state.user
    }
  }

  get uid() {
    return parseInt(this.$route.params.uid)
  }

  get isSelf() {
    return this.$store.state.user.ID === this.uid
  }

  async loadUser(force: boolean = false) {
    if (!this.user || force) {
      this.loading = true
      this.user_ = await this.$api.queryUser(this.uid)
      this.loading = false
    }
  }

}
</script>

<style lang="scss">
.profile-container {
  padding: 10px 20px 32px 32px;
  display: flex;

  .profile-left-menu {
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    position: relative;

    .profile-menu-btn {
      position: relative;
      text-align: left;
      padding: 30px 0 30px 33%;

      @media screen and (max-width: 1500px) {
        & {
          padding-left: 27%;
        }
        .v-btn__content {
          width: 75%;
        }
      }
      @media screen and (max-width: 1350px) {
        & {
          padding-left: 22%;
        }
        .v-btn__content {
          width: 80%;
        }
      }
      @media screen and (max-width: 1200px) {
        & {
          padding-left: 15%;
        }
        .v-btn__content {
          width: 85%;
        }
      }
      margin: 6px 0;

      &:last-child {
        margin-bottom: 0;
      }

      &.v-btn--active::before {
        opacity: 0.05;
      }

      .v-btn__content {
        display: inline;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 70%;
      }

      .profile-menu-btn-icon {
        margin-right: 10px;
        //position: absolute;
        //left: 45%;
      }
    }
  }
}
</style>
