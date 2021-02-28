<template>
  <main-layout>
    <template #listbar>
      <list-bar title="Dialogs"></list-bar>
    </template>
    <template #content>
      <ui-grid direction="column" :class="$style.chat_messages">
        <chat-bar
          :title="currentCompanion.name"
          :url="currentCompanion.avatarURL"
        ></chat-bar>
        <chat-messages></chat-messages>
        <chat-input></chat-input>
      </ui-grid>
    </template>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Grid from '~/ui/grid/index.vue';
import ListBar from '~/components/list-bar/index.vue';
import ChatBar from '~/components/chat-bar/index.vue';
import ChatMessages from '~/components/chat-messages/index.vue';
import ChatInput from '~/components/chat-input/index.vue';
import MainLayout from '~/layouts/main.vue';
import * as ChatsState from '~/store/chats/types';
import * as MeState from '~/store/me/types';
import * as PagesState from '~/store/pages/types';
import * as MessagesState from '~/store/messages/types';
import { State } from '~/store/state.interface';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'list-bar': ListBar,
    'chat-bar': ChatBar,
    'chat-messages': ChatMessages,
    'chat-input': ChatInput,
    'main-layout': MainLayout,
  },
  middleware: ['auth'],
  async fetch() {
    const payload: ChatsState.Actions.GetChatsPayload = {
      type: ChatsState.ChatTypesEnum.DIALOG,
    };
    await this.$store.dispatch(ChatsState.Actions.GET_CHATS, payload);
    await this.$store.dispatch(MeState.Actions.GET_ME_INFO);
    await this.setCurrentChat();
  },
  head() {
    return {
      title: 'Fliness Messenger - Dialogs',
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
          member.chatId === this.currentChatId && member.userId !== this.me.id
      );

      if (!member) return;

      return this.users.find((user) => user.id === member.userId);
    },
  },
  async mounted() {
    await this.setCurrentChat();

    const payload: PagesState.SetPageActionPayload = {
      page: PagesState.Pages.DIALOG,
    };
    await this.$store.dispatch(PagesState.Actions.SET_PAGE, payload);

    await this.$store.dispatch(MessagesState.Actions.CONNECT_SOCKET);
  },
  async destroyed() {
    await this.$store.dispatch(MessagesState.Actions.DISCONNECT_SOCKET);
  },
  methods: {
    async setCurrentChat() {
      const payload: ChatsState.Actions.SetCurrentChatPayload = {
        chatId: this.$route.params.dialogId,
      };
      await this.$store.dispatch(ChatsState.Actions.SET_CURRENT_CHAT, payload);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
