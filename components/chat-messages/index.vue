<template>
  <ui-grid direction="column-reverse" :class="$style.chat_messages">
    <!-- <template v-if="showLoading">
      <skeleton v-for="i in 10" :key="i" :shift="i % 3 === 0"></skeleton>
    </template> -->
    <!-- <template> -->
    <list-item
      v-for="message in formatedMessages"
      :key="message.id"
      :username="message.username"
      :avatar-url="message.avatarURL"
      :text="message.text"
      :time="message.createdAt"
      :shift="message.shift"
    ></list-item>
    <!-- </template> -->
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import ListItem from './list-items.vue';
import Skeleton from './skeleton.vue';
import UiGrid from '~/ui/grid/index.vue';
import { State } from '~/store/state.interface';
import { Status } from '~/store/utils';
import * as MessagesState from '~/store/messages';

export default Vue.extend({
  components: {
    UiGrid,
    ListItem,
    Skeleton,
  },
  computed: {
    ...mapState({
      me(state: State) {
        return state.me;
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
      messages(state: State) {
        return state.messages.all;
      },
      showLoading: (state: State) => state.messages.status === Status.LOADING,
    }),
    formatedMessages() {
      if (!this.currentChatId) return [];

      const messages = this.messages[this.currentChatId] || [];

      return messages.map((message) => {
        const member = this.members.find(
          (member) => member.id === message.memberId,
        );

        const user = this.users.find((user) => user.id === member.userId);

        return {
          ...message,
          username: user.name,
          avatarURL: user.avatarURL,
          shift: this.me.id === user.id,
        };
      });
    },
  },
  async mounted() {
    if (!this.currentChatId) return;

    await this.getChatMessages({
      chatId: this.currentChatId,
    });
  },
  methods: {
    ...mapActions({
      getChatMessages: MessagesState.Actions.GET_MESSAGES,
    }),
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
