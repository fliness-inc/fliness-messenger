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

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import MenuButton from '../menu-item.vue';
import Grid from '~/ui/grid/index.vue';
// @ts-ignore
import DialogsIcon from '~/assets/chat_bubble_outline.svg?inline';
// @ts-ignore
import GroupsIcon from '~/assets/group.svg?inline';
// @ts-ignore
import ChannelsIcon from '~/assets/megaphone.svg?inline';
// @ts-ignore
import SettingsIcon from '~/assets/settings.svg?inline';
import * as PagesState from '~/store/pages/types';

export default Vue.extend({
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
      currentPage: (state: any) => state.pages.currentPage,
    }),
    activeDialogsBtn() {
      return (
        this.currentPage === PagesState.Pages.DIALOGS ||
        this.currentPage === PagesState.Pages.DIALOG
      );
    },
    activeGroupsBtn() {
      return (
        this.currentPage === PagesState.Pages.GROUPS ||
        this.currentPage === PagesState.Pages.GROUP
      );
    },
    activeChannelsBtn() {
      return (
        this.currentPage === PagesState.Pages.CHANNELS ||
        this.currentPage === PagesState.Pages.CHANNEL
      );
    },
    activeSettingsBtn() {
      return this.currentPage === PagesState.Pages.SETTINGS;
    },
  },
  methods: {
    handleMenuBtnClick(type) {
      switch (type) {
        case PagesState.Pages.DIALOGS:
          this.$router.push('/dialogs');
          break;
        case PagesState.Pages.GROUPS:
          this.$router.push('/groups');
          break;
        case PagesState.Pages.CHANNELS:
          this.$router.push('/channels');
          break;
        case PagesState.Pages.SETTINGS:
          this.$router.push('/settings');
          break;
      }
    },
  },
});
</script>

<style lang="scss" src="../index.scss"></style>
