<script>
import { mapState } from 'vuex';
import AvatarIcon from './avatar-icon.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import SearchIcon from '~/assets/search-24px.svg?inline';
import MoreIcon from '~/assets/more.svg?inline';
import SideBarIcon from '~/assets/sidebar.svg?inline';

export default {
  name: 'ChatBar',
  components: {
    AvatarIcon,
    UiGrid,
    UiButton,
    SearchIcon,
    MoreIcon,
    SideBarIcon,
  },
  /* props: {
    title: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
  }, */
  computed: {
    ...mapState({
      me: (state) => state.me,
      currentChatId: (state) => state.chats.currentChatId,
      members: (state) => state.members.all, // array
      users: (state) => state.users.all, // object
    }),
    currentCompanion() {
      const member = this.members.find(
        (member) =>
          member.chatId === this.currentChatId && member.userId !== this.me.id,
      );

      if (!member) return null;

      const user = this.users[member.userId];

      if (!user) return null;

      return user;
    },
    title() {
      return this.currentCompanion ? this.currentCompanion.name : null;
    },
    avatarUrl() {
      return this.currentCompanion ? this.currentCompanion.avatarURL : null;
    },
  },
};
</script>

<template>
  <ui-grid justify="space-between" align-items="center" class="chatbar">
    <ui-grid align-items="center" class="chatbar__avatar">
      <avatar-icon :username="title" :url="avatarUrl"></avatar-icon>
      <ui-grid direction="column" class="chatbar__text">
        <p class="chatbar__title">{{ title }}</p>
        <ui-grid align-items="center">
          <p class="chatbar__status">Active Now</p>
          <span class="chatbar__status_icon"></span>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <ui-button variant="text" class="chatbar__tool_btn">
        <search-icon class="chatbar__tool_btn_icon" />
      </ui-button>
      <ui-button variant="text" class="chatbar__tool_btn">
        <side-bar-icon class="chatbar__tool_btn_icon" />
      </ui-button>
      <ui-button variant="text" class="chatbar__tool_btn">
        <more-icon class="chatbar__tool_btn_icon" />
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
