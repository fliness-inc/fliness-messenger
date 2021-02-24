<template>
  <ui-grid :class="[$style.sidebar, $style.sidebar_vertical]">
    <ui-grid direction="column" :class="$style.sidebar__menu">
      <menu-button :class="$style.menu__item_vertical">
        <dialogs-icon />
      </menu-button>
      <menu-button :class="$style.menu__item_vertical">
        <groups-icon />
      </menu-button>
      <menu-button :class="$style.menu__item_vertical">
        <channels-icon />
      </menu-button>
      <ui-grid justify="flex-end">
        <menu-button :class="[$style.menu__item_vertical, $style.item__bottom]">
          <settings-icon />
        </menu-button>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
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

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'menu-button': MenuButton,
    'dialogs-icon': DialogsIcon,
    'groups-icon': GroupsIcon,
    'channels-icon': ChannelsIcon,
    'settings-icon': SettingsIcon,
  },
});
</script>

<style lang="scss" module src="../index.module.scss"></style>
