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
    <!-- <ui-modal :open="shouldOpenOverMenu" @close="closeOverMenu">
      <ui-grid direction="column" justify="center" align-items="center">
        <app-bar></app-bar>
        <ui-grid wrap="nowrap">
          <side-bar-vertical></side-bar-vertical>
          <slot name="listbar"></slot>
        </ui-grid>
      </ui-grid>
    </ui-modal> -->
    <!--  <ui-modal
      :open="shouldOpenOverWithSidebarMenu"
      @close="closeOverWithSidebarMenu"
    >
      <ui-grid direction="column" justify="center" align-items="center">
        <app-bar></app-bar>
        <ui-grid wrap="nowrap">
          <slot name="listbar"></slot>
        </ui-grid>
      </ui-grid>
    </ui-modal> -->
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import UiModal from '~/ui/modal/index.vue';
import AppBar from '~/components/app-bar/index.vue';
import SideBarVertical from '~/components/side-bar/vertical/index.vue';
import * as FlexState from '~/store/flex';
import { State } from '~/store/state.interface';

export default Vue.extend({
  name: 'MainLaylaod',
  components: {
    UiGrid,
    UiModal,
    AppBar,
    SideBarVertical,
  },
  computed: {
    ...mapState({
      menuState: (state) => (state as State).flex.menuState,
    }),
    shifted() {
      return this.menuState === FlexState.MenuStateEnum.ACTIVE;
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
      'changeMenuState': FlexState.Actions.CHANGE_MENU_STATE,
    }),
    handleContentOverlayClick() {
      this.changeMenuState();
    },
    subsWindowResize() {
      if (this.menuState === FlexState.MenuStateEnum.ACTIVE) {
        this.changeMenuState();
      }
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
