<template>
  <ui-grid :class="['sidebar', 'sidebar_vertical']">
    <ui-grid direction="column" class="sidebar__menu">
      <menu-button
        class="menu__item_vertical"
        :active="activeDialogsBtn"
        @click="handleMenuBtnClick('DIALOGS')"
      >
        <dialogs-icon />
      </menu-button>
      <menu-button
        class="menu__item_vertical"
        :active="activeGroupsBtn"
        @click="handleMenuBtnClick('GROUPS')"
      >
        <groups-icon />
      </menu-button>
      <menu-button
        class="menu__item_vertical"
        :active="activeChannelsBtn"
        @click="handleMenuBtnClick('CHANNELS')"
      >
        <channels-icon />
      </menu-button>
      <ui-grid justify="flex-end">
        <menu-button
          :class="['menu__item_vertical', 'item__bottom']"
          :active="activeSettingsBtn"
          @click="handleMenuBtnClick('SETTINGS')"
        >
          <settings-icon />
        </menu-button>
      </ui-grid>
    </ui-grid>
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
