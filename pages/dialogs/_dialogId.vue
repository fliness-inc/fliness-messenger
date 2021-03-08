<template>
  <main-layout>
    <template #listbar>
      <list-bar-layout title="Dialogs"></list-bar-layout>
    </template>
    <template #content>
      <ui-grid direction="column" class="chat_messages">
        <chat-bar-layout
          :title="currentCompanion.name"
          :url="currentCompanion.avatarURL"
        ></chat-bar-layout>
        <chat-messages-layout></chat-messages-layout>
        <chat-input-layout></chat-input-layout>
      </ui-grid>
    </template>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import UiGrid from '~/ui/grid/index.vue';
import ListBarLayout from '~/components/list-bar/layout.vue';
import ChatBarLayout from '~/components/chat-bar/index.vue';
import ChatMessagesLayout from '~/components/chat-messages/index.vue';
import ChatInputLayout from '~/components/chat-input/index.vue';
import MainLayout from '~/components/layouts/main.vue';
import * as ChatsState from '~/store/chats';
import * as MeState from '~/store/me';
import * as PagesState from '~/store/pages';
import * as MessagesState from '~/store/messages';
import { State } from '~/store/state.interface';

export default Vue.extend({
  components: {
    UiGrid,
    ListBarLayout,
    ChatBarLayout,
    ChatMessagesLayout,
    ChatInputLayout,
    MainLayout,
  },
  middleware: ['auth'],
  async fetch() {
    await this.getMeInfo();
    await this.setCurrnetChat({
      chatId: this.$route.params.dialogId,
    });
    await this.getChats({ type: ChatsState.ChatTypesEnum.DIALOG });
  },
  head() {
    return {
      title: `Fliness Messenger - ${this.currentCompanion.name}`,
    };
  },
  computed: {
    ...mapState({
      me(state: State) {
        return state.me;
      },
      currentChatId: (state: State) => state.chats.currentChatId,
      chats: (state: State) => state.chats.all,
      members: (state: State) => state.members.all,
      users: (state: State) => state.users.all,
      messagesSocketConnectionState: (state: State) =>
        state.messages.socketConnectionState,
    }),
    currentChat() {
      return this.chats.find((chat) => chat.id === this.currentChatId);
    },
    currentCompanion() {
      const member = this.members.find(
        (member) =>
          member.chatId === this.currentChatId && member.userId !== this.me.id,
      );

      if (!member) return;

      return this.users.find((user) => user.id === member.userId);
    },
  },
  async mounted() {
    await this.setCurrnetChat({
      chatId: this.$route.params.dialogId,
    });

    await this.setCurrentPage({
      page: PagesState.Pages.DIALOG,
    });

    await this.getChats({ type: ChatsState.ChatTypesEnum.DIALOG });
  },
  async destroyed() {
    await this.unsubOnGetMessages();
  },
  methods: {
    ...mapActions({
      'getMeInfo': MeState.Actions.GET_ME_INFO,
      'getChats': ChatsState.Actions.GET_CHATS,
      'setCurrentPage': PagesState.Actions.SET_PAGE,
      'setCurrnetChat': ChatsState.Actions.SET_CURRENT_CHAT,
      'subOnGetMessages': MessagesState.Actions.SUB_ON_GET_MESSAGES,
      'unsubOnGetMessages': MessagesState.Actions.UNSUB_ON_GET_MESSAGES,
    }),
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
