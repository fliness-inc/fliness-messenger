<script>
import { mapActions, mapState } from 'vuex';
import ChatList from './list.vue';
import Skeleton from './skeleton.vue';
import UiGrid from '~/ui/grid/index.vue';
import Search from '~/components/search/index.vue';
import SideBarHorizontal from '~/components/side-bar/horizontal/index.vue';
import CreateDialogModal from '~/components/dialogs/create-dialog/index.vue';
import * as MenuStates from '~/store/flex/menu-states';
import * as NetworkStatus from '~/store/network-status';
import * as ChatsActions from '~/store/chats/actions';
import * as InitStatus from '~/store/initialization-status';

export default {
  name: 'ListBarLayout',
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
      menuState: (state) => state.flex.menuState,
      isLoading(state) {
        return (
          state.chats.status !== NetworkStatus.SUCCESS &&
          state.chats.initStatus !== InitStatus.INIT
        );
      },
    }),
    active() {
      return this.menuState === MenuStates.ACTIVE;
    },
  },
  async mounted() {
    await this.getChats();
    await this.setChatsInitStatus({ status: InitStatus.INIT });
  },
  methods: {
    ...mapActions({
      'setChatsInitStatus': ChatsActions.SET_INIT_STATUS,
      'getChats': ChatsActions.GET_CHATS,
    }),
  },
};
</script>

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
    <skeleton v-if="isLoading"></skeleton>
    <chat-list v-else></chat-list>
    <side-bar-horizontal></side-bar-horizontal>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
