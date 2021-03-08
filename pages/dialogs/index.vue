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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import ListBarLayout from '~/components/list-bar/layout.vue';
import MainLayout from '~/components/layouts/main.vue';
// @ts-ignore
import DialogsIcon from '~/assets/chat_bubble_outline.svg?inline';
import * as PagesState from '~/store/pages';
import * as ChatsState from '~/store/chats';
import * as MeState from '~/store/me';
import * as MessagesState from '~/store/messages/types';

export default Vue.extend({
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
      page: PagesState.Pages.DIALOG,
    });
  },
  head() {
    return {
      title: 'Fliness Messenger - Dialogs',
    };
  },
  async mounted() {
    await this.setCurrentPage({
      page: PagesState.Pages.DIALOG,
    });

    await this.subOnGetMessages();
  },
  async destroyed() {
    await this.unsubOnGetMessages();
  },
  methods: {
    ...mapActions({
      'setCurrentPage': PagesState.Actions.SET_PAGE,
      'getChats': ChatsState.Actions.GET_CHATS,
      'getMeInfo': MeState.Actions.GET_ME_INFO,
      'subOnGetMessages': MessagesState.Actions.SUB_ON_GET_MESSAGES,
      'unsubOnGetMessages': MessagesState.Actions.UNSUB_ON_GET_MESSAGES,
    }),
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
