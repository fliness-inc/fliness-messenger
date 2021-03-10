<script>
import { mapActions, mapState } from 'vuex';
import AvatarIcon from './avatar-icon.vue';
import InfoButton from './btn.vue';
import UiGrid from '~/ui/grid/index';
import UiButton from '~/ui/button/index';
import UiSwitch from '~/ui/switch/index';
import CloseIcon from '~/assets/close.svg?inline';
import InfoIcon from '~/assets/information.svg?inline';
import BellIcon from '~/assets/bell.svg?inline';
import * as MenuInfoState from '~/store/flex/menu-info-state';
import * as FlexActions from '~/store/flex/actions';

export default {
  name: 'InfoBar',
  components: {
    UiGrid,
    UiButton,
    UiSwitch,
    CloseIcon,
    AvatarIcon,
    InfoIcon,
    BellIcon,
    InfoButton,
  },
  computed: {
    ...mapState({
      showInfoBar: (state) => state.flex.menuInfoState === MenuInfoState.ACTIVE,
    }),
  },
  methods: {
    ...mapActions({
      'changeMenuInfoState': FlexActions.CHANGE_MENU_INFO_STATE,
    }),
    handleInfoBarBtnClick() {
      this.changeMenuInfoState();
    },
  },
};
</script>

<template>
  <ui-grid
    align-items="center"
    direction="column"
    :class="['infobar', { 'infobar--active': showInfoBar }]"
  >
    <ui-grid align-items="center" class="infobar__header">
      <ui-grid align-items="center" justify="space-between">
        <p class="header__title">User Info</p>
        <ui-button
          variant="text"
          class="header__close-btn"
          @click="handleInfoBarBtnClick"
        >
          <close-icon></close-icon>
        </ui-button>
      </ui-grid>
    </ui-grid>
    <ui-grid align-items="center" class="infobar__chat-info">
      <avatar-icon username="Username" :url="null"></avatar-icon>
      <ui-grid
        direction="column"
        justify="space-between"
        class="chat-info__text"
      >
        <p class="chat-info__title">Username</p>
        <ui-grid align-items="center" class="chat-info__status">
          <p class="chat-info__status-title">Active Now</p>
          <span class="chat-info__status-icon"></span>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid align-items="center" class="infobar__chat-info">
      <ui-grid justify="space-between">
        <info-icon class="chat-info__bio-icon"></info-icon>
        <ui-grid class="bio-link__bio-text" direction="column">
          <ui-grid class="bio-link__bio-parag" direction="column">
            <a class="bio-link__url">@user-link</a>
            <p class="bio-link__title">Link</p>
          </ui-grid>
          <ui-grid class="bio-link__bio-parag" direction="column">
            <a class="bio-link__text">@user-link</a>
            <p class="bio-link__title">Description</p>
          </ui-grid>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid
      align-items="center"
      direction="column"
      class="infobar__chat-info infobar__notif"
    >
      <info-button class="btn__notif">
        <template #icon>
          <bell-icon class="btn__icon"></bell-icon>
        </template>
        <template #text> Notifications </template>
        <template #badge>
          <ui-switch></ui-switch>
        </template>
      </info-button>
      <!-- <info-button>
        <template #icon>
          <bell-icon class="btn__icon"></bell-icon>
        </template>
        <template #text> 0 photos </template>
      </info-button>
      <info-button>
        <template #icon>
          <bell-icon class="btn__icon"></bell-icon>
        </template>
        <template #text> 0 shared links </template>
      </info-button> -->
    </ui-grid>
    <ui-grid
      align-items="center"
      direction="column"
      class="infobar__chat-info infobar__bottom"
    >
      <info-button>
        <template #icon>
          <span class="btn__icon"></span>
        </template>
        <template #text> Delete Chat </template>
      </info-button>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
