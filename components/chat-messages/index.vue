<template>
  <ui-grid direction="column" :class="$style.chat_messages">
    <list-item
      v-for="message in formatedMessages"
      :key="message.id"
      :username="message.username"
      :avatarURL="message.avatarURL"
      :text="message.text"
      :time="message.createdAt"
      :shift="message.shift"
    ></list-item>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import ListItem from './list-items.vue';
import Grid from '~/ui/grid/index.vue';
import { State } from '~/store/state.interface';
import * as MessagesState from '~/store/messages/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'list-item': ListItem,
  },
  computed: {
    ...mapState({
      me(state: State) {
        return state.me;
      },
      messages(state: State) {
        return state.messages.messagesCurrentChat;
      },
      currentChatId(state: State) {
        return state.chats.currentChatId;
      },
      members(state: State) {
        return state.members.all;
      },
      users(state: State) {
        return state.users.all;
      },
    }),
    formatedMessages() {
      return this.messages.map((message) => {
        const member = this.members.find(
          (member) => member.id === message.memberId
        );

        const user = this.users.find((user) => user.id === member.userId);

        return {
          ...message,
          username: user.name || 'fds',
          avatarURL: user.avatarURL,
          shift: this.me.id === user.id,
        };
      });
    },
  },
  updated() {
    this.$el.scrollTop = this.$el.scrollHeight;
  },
  async mounted() {
    if (!this.currentChatId) return;

    const payload: MessagesState.Actions.GetMessagesPayload = {
      chatId: this.currentChatId,
    };
    await this.$store.dispatch(MessagesState.Actions.GET_MESSAGES, payload);
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
