<template>
  <ui-grid direction="column">
    <app-bar></app-bar>
    <ui-grid wrap="nowrap">
      <side-bar-vertical v-if="showSidebar"></side-bar-vertical>
      <template v-if="showListbar">
        <slot name="listbar"></slot>
      </template>
      <slot name="content"></slot>
    </ui-grid>
    <ui-modal :open="shouldOpenOverMenu" @close="closeOverMenu">
      <ui-grid direction="column" justify="center" align-items="center">
        <app-bar></app-bar>
        <ui-grid wrap="nowrap">
          <side-bar-vertical></side-bar-vertical>
          <slot name="listbar"></slot>
        </ui-grid>
      </ui-grid>
    </ui-modal>
    <ui-modal
      :open="shouldOpenOverWithSidebarMenu"
      @close="closeOverWithSidebarMenu"
    >
      <ui-grid direction="column" justify="center" align-items="center">
        <app-bar></app-bar>
        <ui-grid wrap="nowrap">
          <slot name="listbar"></slot>
        </ui-grid>
      </ui-grid>
    </ui-modal>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Grid from '~/ui/grid/index.vue';
import Modal from '~/ui/modal/index.vue';
import AppBar from '~/components/app-bar/index.vue';
import SideBarVertical from '~/components/side-bar/vertical/index.vue';
import { MenuStateEnum } from '~/store/flex/state';
import {
  SET_MENU_STATE_ACTION,
  UPDATE_MENU_STATE_ACTION,
} from '~/store/flex/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-modal': Modal,
    'app-bar': AppBar,
    'side-bar-vertical': SideBarVertical,
  },
  computed: {
    ...mapState({
      menuState: (state: any) => state.flex.menuState,
    }),
    shouldOpenOverMenu() {
      return this.menuState === MenuStateEnum.MOVING_OVER_ACTIVE;
    },
    shouldOpenOverWithSidebarMenu() {
      return this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE;
    },
    showSidebar() {
      return !(
        this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE ||
        this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE
      );
    },
    showListbar() {
      return this.menuState === MenuStateEnum.MOVING_ACTIVE;
    },
  },
  mounted() {
    // @ts-ignore
    this.flexObserver();
    // @ts-ignore
    window.addEventListener('resize', this.flexObserver);
  },
  beforeDestroy() {
    // @ts-ignore
    window.removeEventListener('resize', this.flexObserver);
  },
  methods: {
    flexObserver() {
      this.$store.dispatch(UPDATE_MENU_STATE_ACTION);
    },
    closeOverMenu() {
      this.$store.dispatch(
        SET_MENU_STATE_ACTION,
        MenuStateEnum.MOVING_OVER_DEACTIVE
      );
    },
    closeOverWithSidebarMenu() {
      this.$store.dispatch(
        SET_MENU_STATE_ACTION,
        MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_DEACTIVE
      );
    },
  },
});
</script>
