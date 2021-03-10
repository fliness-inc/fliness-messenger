<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import ListBarLayout from '~/components/list-bar/layout.vue';
import ChatBarLayout from '~/components/chat-bar/index.vue';
import ChatMessagesLayout from '~/components/chat-messages/index.vue';
import ChatInputLayout from '~/components/chat-input/index.vue';
import MainLayout from '~/components/layouts/main.vue';
import InfoBar from '~/components/info-bar/index.vue';
import * as Pages from '~/store/pages/pages';
import * as ChatsActions from '~/store/chats/actions';
import * as ChatTypes from '~/store/chats/chat-types';
import * as MeActions from '~/store/me/actions';
import * as PagesActions from '~/store/pages/actions';
import * as MessagesActions from '~/store/messages/actions';

export default {
  components: {
    UiGrid,
    ListBarLayout,
    ChatBarLayout,
    ChatMessagesLayout,
    ChatInputLayout,
    MainLayout,
    InfoBar,
  },
  middleware: ['auth'],
  async fetch() {
    await this.getMeInfo();
    await this.setCurrentPage({
      page: Pages.DIALOG,
    });
    await this.setCurrnetChat({
      chatId: this.$route.params.dialogId,
    });
  },
  head() {
    return {
      title: `Fliness Messenger - Dialogs`, // ${this.currentCompanion.name}
    };
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
      currentChatId: (state) => state.chats.currentChatId,
      chats: (state) => state.chats.all,
      members: (state) => state.members.all,
      users: (state) => state.users.all,
    }),
    ...mapGetters(['currentChat']),
    currentCompanion() {
      const member = this.members.find(
        (member) =>
          member.chatId === this.currentChatId && member.userId !== this.me.id,
      );

      if (!member) return {};

      return this.users[member.userId];
    },
  },
  async mounted() {
    await this.setCurrnetChat({
      chatId: this.$route.params.dialogId,
    });

    await this.setCurrentPage({
      page: Pages.DIALOG,
    });

    await this.getChats({ type: ChatTypes.DIALOG });

    await this.subOnGetMessages();
  },
  async destroyed() {
    await this.unsubOnGetMessages();
  },
  methods: {
    ...mapActions({
      'getMeInfo': MeActions.GET_ME_INFO,
      'getChats': ChatsActions.GET_CHATS,
      'setCurrentPage': PagesActions.SET_PAGE,
      'setCurrnetChat': ChatsActions.SET_CURRENT_CHAT,
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
      <ui-grid direction="column" class="chat_messages">
        <chat-bar-layout></chat-bar-layout>
        <chat-messages-layout></chat-messages-layout>
        <chat-input-layout></chat-input-layout>
      </ui-grid>
      <info-bar></info-bar>
    </template>
  </main-layout>
</template>

<style lang="scss" src="./index.scss"></style>
