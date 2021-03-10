<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import AvatarIcon from './avatar-icon.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiButton from '~/ui/button/index.vue';
import MenuIcon from '~/assets/menu.svg?inline';
import LogoIcon from '~/assets/logo.svg?inline';
import ArrowIcon from '~/assets/keyboard_arrow_down.svg?inline';
import * as FlexActions from '~/store/flex/actions';
import * as MeActions from '~/store/me/actions';
import UiPopup from '~/ui/popup/index.vue';
import * as Themes from '~/store/me/themes';

export default {
  name: 'AppBar',
  components: {
    UiGrid,
    UiButton,
    UiPopup,
    MenuIcon,
    LogoIcon,
    ArrowIcon,
    AvatarIcon,
  },
  data() {
    return {
      anchor: null,
    };
  },
  computed: {
    ...mapGetters(['me']),
    ...mapState({
      theme: (state) => state.me.theme,
    }),
  },
  async mounted() {
    await this.getMeInfo();
  },
  methods: {
    ...mapActions({
      'changeMenuState': FlexActions.CHANGE_MENU_STATE,
      'getMeInfo': MeActions.GET_ME_INFO,
      'setTheme': MeActions.SET_THEME,
    }),
    handleMenuBtnClick() {
      this.changeMenuState();
    },
    handleAccountBtnClick(e) {
      this.anchor = e.currentTarget;
    },
    handleClosePopup() {
      this.anchor = null;
    },
    handleChangeThenBtnClick() {
      if (this.theme === Themes.LIGHT) {
        this.setTheme({ theme: Themes.DARK });
      } else {
        this.setTheme({ theme: Themes.LIGHT });
      }

      this.anchor = null;
    },
  },
};
</script>

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
          <ui-button
            variant="text"
            class="account__btn"
            @click="handleAccountBtnClick"
          >
            <p class="account__username">{{ me.name }}</p>
            <avatar-icon :url="me.avatarURL" :username="me.name"></avatar-icon>
            <arrow-icon class="account__arrow-icon" />
          </ui-button>
          <ui-popup
            :open="Boolean(anchor)"
            :anchor="{ root: anchor }"
            position="left-bottom"
            @close="handleClosePopup"
          >
            <ui-grid direction="column" class="settings-popup">
              <ui-button
                variant="text"
                class="settings-popup__btn"
                @click="handleChangeThenBtnClick"
              >
                🌓 Change Theme
              </ui-button>
            </ui-grid>
          </ui-popup>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
