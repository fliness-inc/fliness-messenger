<script>
import { mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import ListBarLayout from '~/components/list-bar/layout.vue';
import MainLayout from '~/components/layouts/main.vue';
import DialogsIcon from '~/assets/chat_bubble_outline.svg?inline';
import * as Pages from '~/store/pages/pages';
import * as PagesActions from '~/store/pages/actions';
import * as ChatsActions from '~/store/chats/actions';
import * as MeActions from '~/store/me/actions';
import * as MessagesActions from '~/store/messages/actions';

export default {
  components: {
    UiGrid,
    ListBarLayout,
    MainLayout,
    DialogsIcon,
  },
  middleware: ['auth'],
  async fetch() {
    await this.getMeInfo();
    await this.setCurrentPage({
      page: Pages.DIALOG,
    });
  },
  head() {
    return {
      title: 'Fliness Messenger - Dialogs',
    };
  },
  async mounted() {
    await this.setCurrentPage({
      page: Pages.DIALOG,
    });

    await this.subOnGetMessages();
  },
  async destroyed() {
    await this.unsubOnGetMessages();
  },
  methods: {
    ...mapActions({
      'setCurrentPage': PagesActions.SET_PAGE,
      'getChats': ChatsActions.GET_CHATS,
      'getMeInfo': MeActions.GET_ME_INFO,
      'subOnGetMessages': MessagesActions.SUB_ON_GET_MESSAGES,
      'unsubOnGetMessages': MessagesActions.UNSUB_ON_GET_MESSAGES,
    }),
  },
};
</script>

<template>
  <main-layout>
    <template #listbar>
      <list-bar-layout title="Dialogs"></list-bar-layout>
    </template>
    <template #content>
      <ui-grid
        direction="column"
        align-items="center"
        justify="center"
        :class="['chat_messages', 'chat_messages__plug']"
      >
        <ui-grid direction="column" align-items="center" class="plug">
          <dialogs-icon class="plug__icon"></dialogs-icon>
          <p class="plug__title">Please select a dialog</p>
          <p class="plug__desc">to start messaging</p>
        </ui-grid>
      </ui-grid>
    </template>
  </main-layout>
</template>

<style lang="scss" src="./index.scss"></style>
