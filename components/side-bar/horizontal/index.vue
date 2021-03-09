<script>
import { mapState } from 'vuex';
import MenuButton from '../menu-item.vue';
import Grid from '~/ui/grid/index.vue';
import DialogsIcon from '~/assets/chat_bubble_outline.svg?inline';
import GroupsIcon from '~/assets/group.svg?inline';
import ChannelsIcon from '~/assets/megaphone.svg?inline';
import SettingsIcon from '~/assets/settings.svg?inline';
import * as Pages from '~/store/pages/pages';

export default {
  components: {
    'ui-grid': Grid,
    'menu-button': MenuButton,
    'dialogs-icon': DialogsIcon,
    'groups-icon': GroupsIcon,
    'channels-icon': ChannelsIcon,
    'settings-icon': SettingsIcon,
  },
  computed: {
    ...mapState({
      currentPage: (state) => state.pages.currentPage,
    }),
    activeDialogsBtn() {
      return (
        this.currentPage === Pages.DIALOGS || this.currentPage === Pages.DIALOG
      );
    },
    activeGroupsBtn() {
      return (
        this.currentPage === Pages.GROUPS || this.currentPage === Pages.GROUP
      );
    },
    activeChannelsBtn() {
      return (
        this.currentPage === Pages.CHANNELS ||
        this.currentPage === Pages.CHANNEL
      );
    },
    activeSettingsBtn() {
      return this.currentPage === Pages.SETTINGS;
    },
  },
  methods: {
    handleMenuBtnClick(type) {
      switch (type) {
        case Pages.DIALOGS:
          this.$router.push('/dialogs');
          break;
        case Pages.GROUPS:
          this.$router.push('/groups');
          break;
        case Pages.CHANNELS:
          this.$router.push('/channels');
          break;
        case Pages.SETTINGS:
          this.$router.push('/settings');
          break;
      }
    },
  },
};
</script>

<template>
  <ui-grid :class="['sidebar', 'sidebar_horizontal']">
    <menu-button
      class="menu__item_horizontal"
      :active="activeDialogsBtn"
      @click="handleMenuBtnClick('DIALOGS')"
    >
      <dialogs-icon />
    </menu-button>
    <menu-button
      class="menu__item_horizontal"
      :active="activeGroupsBtn"
      @click="handleMenuBtnClick('GROUPS')"
    >
      <groups-icon />
    </menu-button>
    <menu-button
      class="menu__item_horizontal"
      :active="activeChannelsBtn"
      @click="handleMenuBtnClick('CHANNELS')"
    >
      <channels-icon />
    </menu-button>
    <menu-button
      class="menu__item_horizontal"
      :active="activeSettingsBtn"
      @click="handleMenuBtnClick('SETTINGS')"
    >
      <settings-icon />
    </menu-button>
  </ui-grid>
</template>

<style lang="scss" src="../index.scss"></style>
