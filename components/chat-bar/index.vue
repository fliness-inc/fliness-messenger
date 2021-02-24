<template>
  <ui-grid justify="space-between" align-items="center" :class="$style.chatbar">
    <ui-grid align-items="center" :class="$style.chatbar__avatar">
      <avatar-icon username="title" url=""></avatar-icon>
      <ui-grid direction="column" :class="$style.chatbar__text">
        <p :class="$style.chatbar__title">{{ title }}</p>
        <ui-grid align-items="center">
          <p :class="$style.chatbar__status">Active Now</p>
          <span :class="$style.chatbar__status_icon"></span>
        </ui-grid>
      </ui-grid>
    </ui-grid>
    <ui-grid align-items="center" justify="flex-end">
      <ui-button variant="text" :class="$style.chatbar__tool_btn">
        <search-icon :class="$style.chatbar__tool_btn_icon" />
      </ui-button>
      <ui-button variant="text" :class="$style.chatbar__tool_btn">
        <sidebar-icon :class="$style.chatbar__tool_btn_icon" />
      </ui-button>
      <ui-button variant="text" :class="$style.chatbar__tool_btn">
        <more-icon :class="$style.chatbar__tool_btn_icon" />
      </ui-button>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import AvatarIcon from './avatar-icon.vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
// @ts-ignore
import SearchIcon from '~/assets/search-24px.svg?inline';
// @ts-ignore
import MoreIcon from '~/assets/more.svg?inline';
// @ts-ignore
import SideBarIcon from '~/assets/sidebar.svg?inline';

export default Vue.extend({
  components: {
    'avatar-icon': AvatarIcon,
    'ui-grid': Grid,
    'ui-button': Button,
    'search-icon': SearchIcon,
    'more-icon': MoreIcon,
    'sidebar-icon': SideBarIcon,
  },
  data() {
    return {
      title: 'Chat Title',
    };
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
