<template>
  <ui-grid align-items="center" class="app-bar">
    <ui-grid justify="space-between">
      <ui-grid align-items="center">
        <ui-grid align-items="center" justify="center" class="menu">
          <ui-button
            variant="text"
            class="menu__btn"
            @click="handleMenuBtnClick"
          >
            <menu-icon class="menu__icon" />
          </ui-button>
        </ui-grid>
        <ui-grid align-items="center" class="logo">
          <logo-icon class="logo__icon" />
          <h1 class="logo__title">Fliness</h1>
        </ui-grid>
      </ui-grid>
      <ui-grid align-items="center" justify="flex-end">
        <ui-grid align-item="center" justify="flex-end" class="account">
          <ui-button variant="text" class="account__btn">
            <p class="account__username">{{ me.name }}</p>
            <avatar-icon :url="me.avatarURL" :username="me.name"></avatar-icon>
            <arrow-icon class="account__arrow-ico" />
          </ui-button>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AvatarIcon from './avatar-icon.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
// @ts-ignore
import MenuIcon from '~/assets/menu.svg?inline';
// @ts-ignore
import LogoIcon from '~/assets/logo.svg?inline';
// @ts-ignore
import ArrowIcon from '~/assets/keyboard_arrow_down.svg?inline';
import * as FlexState from '~/store/flex';
import * as MeState from '~/store/me';

export default Vue.extend({
  name: 'AppBar',
  components: {
    UiGrid,
    UiButton,
    MenuIcon,
    LogoIcon,
    ArrowIcon,
    AvatarIcon,
  },
  async fetch() {
    await this.getMeInfo();
  },
  computed: {
    ...mapGetters(['me']),
  },
  methods: {
    ...mapActions({
      changeMenuState: FlexState.Actions.CHANGE_MENU_STATE,
      getMeInfo: MeState.Actions.GET_ME_INFO,
    }),
    handleMenuBtnClick() {
      this.changeMenuState();
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
