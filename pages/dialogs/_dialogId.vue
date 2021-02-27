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
    const payload: ChatsState.GetChatsActionPayload = {
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
      me: (state: any) => state.me,
      currentChatId: (state: any) => state.chats.currentChatId,
      chats: (state: any) => state.chats.all,
      members: (state: any) => state.members.all,
      users: (state: any) => state.users.all,
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
  },
  methods: {
    async setCurrentChat() {
      const payload: ChatsState.SetCurrentChatActionPayload = {
        chatId: this.$route.params.dialogId,
      };
      await this.$store.dispatch(ChatsState.Actions.SET_CURRENT_CHAT, payload);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
