<script>
import { mapActions, mapState } from 'vuex';
import ListItem from './list-items.vue';
import Skeleton from './skeleton.vue';
import UiGrid from '~/ui/grid/index.vue';
import * as MessagesActions from '~/store/messages/actions';
import * as NetworkStatus from '~/store/network-status';
import * as InitStatus from '~/store/initialization-status';

export default {
  name: 'ChatMessages',
  components: {
    UiGrid,
    ListItem,
    Skeleton,
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
      currentChatId: (state) => state.chats.currentChatId,
      members: (state) => state.members.all,
      users: (state) => state.users.all,
      messages: (state) => state.messages.all,
      isLoading(state) {
        return (
          state.messages.networkStatus !== NetworkStatus.SUCCESS &&
          state.messages.initStatus !== InitStatus.INIT
        );
      },
    }),
    formatedMessages() {
      const messages = this.messages[this.currentChatId] || [];

      return messages.map((message) => {
        const member = this.members.find(
          (member) => member.id === message.memberId,
        );

        if (!member) return {};

        const user = this.users[member.userId];

        if (!user) return {};

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
    await this.getChatMessages({
      chatId: this.currentChatId,
    });
    await this.setMessagesInitStatus({ status: InitStatus.INIT });
  },
  methods: {
    ...mapActions({
      'getChatMessages': MessagesActions.GET_MESSAGES,
      'setMessagesInitStatus': MessagesActions.SET_INIT_STATUS,
    }),
  },
};
</script>

<template>
  <ui-grid direction="column-reverse" :class="$style.chat_messages">
    <skeleton v-if="isLoading"></skeleton>
    <template v-else>
      <list-item
        v-for="message in formatedMessages"
        :key="message.id"
        :username="message.username"
        :avatar-url="message.avatarURL"
        :text="message.text"
        :time="message.createdAt"
        :shift="message.shift"
      ></list-item>
    </template>
  </ui-grid>
</template>

<style lang="scss" module src="./index.module.scss"></style>
