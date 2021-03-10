<script>
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import AppBar from '~/components/app-bar/index.vue';
import SideBarVertical from '~/components/side-bar/vertical/index.vue';
import * as MenuStates from '~/store/flex/menu-states';
import * as MenuInfoState from '~/store/flex/menu-info-state';
import * as FlexActions from '~/store/flex/actions';

export default {
  name: 'MainLayout',
  components: {
    UiGrid,
    AppBar,
    SideBarVertical,
  },
  computed: {
    ...mapState({
      shiftedLeft: (state) => state.flex.menuState === MenuStates.ACTIVE,
      shiftedRight: (state) =>
        state.flex.menuInfoState === MenuInfoState.ACTIVE,
    }),
  },
  mounted() {
    window.addEventListener('resize', this.subsWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.subsWindowResize);
  },
  methods: {
    ...mapActions({
      'setMenuState': FlexActions.SET_MENU_STATE,
      'changeMenuState': FlexActions.CHANGE_MENU_STATE,
      'setMenuInfoState': FlexActions.SET_MENU_INFO_STATE,
      'changeMenuInfoState': FlexActions.CHANGE_MENU_INFO_STATE,
    }),
    handleContentOverlayClick() {
      this.changeMenuState();
    },
    subsWindowResize() {
      if (this.shiftedLeft) this.setMenuState({ state: MenuStates.NONE });
      if (this.shiftedRight)
        this.setMenuInfoState({ state: MenuInfoState.NONE });
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
        :class="[
          'content__layout',
          { 'content__layout--shifted': shiftedLeft },
          { 'content__layout--shifted-right': shiftedRight },
        ]"
      >
        <div
          :class="[
            'content__overlay',
            { 'content__overlay--show': shiftedLeft },
          ]"
          @click="handleContentOverlayClick"
        ></div>
        <slot name="content"></slot>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
