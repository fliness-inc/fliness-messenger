<template>
  <ui-grid
    direction="column"
    :class="['listbar', { 'listbar--active': active }]"
  >
    <ui-grid direction="column" class="listbar__header">
      <h1 class="listbar__title">{{ title }}</h1>
      <search />
      <ui-grid
        align-items="center"
        justify="space-between"
        class="listbar__btns"
      >
        <create-dialog-modal />
      </ui-grid>
    </ui-grid>
    <skeleton v-if="showLoading"></skeleton>
    <chat-list v-else></chat-list>
    <side-bar-horizontal></side-bar-horizontal>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import ChatList from './list.vue';
import Skeleton from './skeleton.vue';
import UiGrid from '~/ui/grid/index.vue';
import Search from '~/components/search/index.vue';
import SideBarHorizontal from '~/components/side-bar/horizontal/index.vue';
import CreateDialogModal from '~/components/dialogs/create-dialog/index.vue';
import { MenuStateEnum } from '~/store/flex';
import { State } from '~/store/state.interface';
import { Status } from '~/store/utils';

export default Vue.extend({
  components: {
    UiGrid,
    Skeleton,
    ChatList,
    Search,
    CreateDialogModal,
    SideBarHorizontal,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      menuState: (state) => (state as State).flex.menuState,
      showLoading: (state) =>
        (state as State).chats.status !==
        Status.SUCCESS /*  &&
        !Object.keys((state as State).chats.all).length */,
      showSidebar() {
        return this.menuState === MenuStateEnum.NONE;
      },
    }),
    active() {
      return this.menuState === MenuStateEnum.ACTIVE;
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
