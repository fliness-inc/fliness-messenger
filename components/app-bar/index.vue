<template>
  <ui-grid align-items="center" :class="$style['app-bar']">
    <ui-grid justify="space-between">
      <ui-grid align-items="center">
        <ui-grid align-items="center" justify="center" :class="$style.menu">
          <ui-button
            variant="text"
            :class="$style.menu__btn"
            @click="handleMenuBtnClick"
          >
            <menu-icon :class="$style.menu__icon" />
          </ui-button>
        </ui-grid>
        <ui-grid align-items="center" :class="$style.logo">
          <logo-icon :class="$style.logo__icon" />
          <h1 :class="$style.logo__title">Fliness</h1>
        </ui-grid>
      </ui-grid>
      <ui-grid align-items="center" justify="flex-end">
        <ui-grid align-item="center" justify="flex-end" :class="$style.account">
          <ui-button variant="text" :class="$style.account__btn">
            <p :class="$style.account__username">{{ name }}</p>
            <avatar-icon :url="avatarURL" :username="name"></avatar-icon>
            <arrow-icon :class="$style['account__arrow-icon']" />
          </ui-button>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import AvatarIcon from './avatar-icon.vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
// @ts-ignore
import MenuIcon from '~/assets/menu.svg?inline';
// @ts-ignore
import LogoIcon from '~/assets/logo.svg?inline';
// @ts-ignore
import ArrowIcon from '~/assets/keyboard_arrow_down.svg?inline';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'menu-icon': MenuIcon,
    'logo-icon': LogoIcon,
    'arrow-icon': ArrowIcon,
    'avatar-icon': AvatarIcon,
  },
  data() {
    return {
      name: null,
      avatarURL: null,
    };
  },
  async fetch() {
    const res = await this.$store.dispatch('me/getMeInfo');

    this.name = res.name;
    this.avatarURL = res.avatarURL;
  },
  methods: {
    handleMenuBtnClick() {
      this.$store.dispatch('flex/changeMenuState');
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
