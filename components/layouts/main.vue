<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import AppBar from '~/components/app-bar/index.vue';
import SideBarVertical from '~/components/side-bar/vertical/index.vue';
import * as MenuStates from '~/store/flex/menu-states';
import * as MeneActions from '~/store/flex/actions';

export default {
  name: 'MainLayout',
  components: {
    UiGrid,
    AppBar,
    SideBarVertical,
  },
  computed: {
    ...mapState({
      menuState: (state) => state.flex.menuState,
    }),
    shifted() {
      return this.menuState === MenuStates.ACTIVE;
    },
  },
  mounted() {
    window.addEventListener('resize', this.subsWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.subsWindowResize);
  },
  methods: {
    ...mapActions({
      'setMenuState': MeneActions.SET_MENU_STATE,
      'changeMenuState': MeneActions.CHANGE_MENU_STATE,
    }),
    handleContentOverlayClick() {
      this.changeMenuState();
    },
    subsWindowResize() {
      if (this.menuState === MenuStates.ACTIVE) {
        this.setMenuState({ state: MenuStates.NONE });
      }
    },
  },
};
</script>

<template>
  <ui-grid direction="column">
    <app-bar></app-bar>
    <ui-grid wrap="nowrap">
      <side-bar-vertical></side-bar-vertical>
      <slot name="listbar"></slot>
      <ui-grid
        :class="['content__layout', { 'content__layout--shifted': shifted }]"
      >
        <div
          :class="['content__overlay', { 'content__overlay--show': shifted }]"
          @click="handleContentOverlayClick"
        ></div>
        <slot name="content"></slot>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
