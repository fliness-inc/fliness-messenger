<template>
  <main-layout>
    <template #listbar>
      <list-bar title="Dialogs"></list-bar>
    </template>
    <template #content>
      <ui-grid direction="column" :class="$style.chat_messages">
        <chat-bar></chat-bar>
        <chat-messages></chat-messages>
        <chat-input></chat-input>
      </ui-grid>
    </template>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';
import ListBar from '~/components/list-bar/index.vue';
import ChatBar from '~/components/chat-bar/index.vue';
import ChatMessages from '~/components/chat-messages/index.vue';
import ChatInput from '~/components/chat-input/index.vue';
import MainLayout from '~/layouts/main.vue';
import { Actions, SetCurrentChatActionPayload } from '~/store/chats/types';

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
  head() {
    return {
      title: 'Fliness Messenger - Dialogs',
    };
  },
  async mounted() {
    const payload: SetCurrentChatActionPayload = {
      chatId: this.$route.params.dialogId,
    };
    await this.$store.dispatch(Actions.SET_CURRENT_CHAT, payload);
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
