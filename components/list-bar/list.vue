<template>
  <ui-grid direction="column" class="list">
    <template v-for="chat in chats">
      <list-item
        :key="chat.id"
        :username="getCompanion(chat.id).name"
        :avatar-url="getCompanion(chat.id).avatarURL"
        :title="getCompanion(chat.id).name"
        :active="currentChatId === chat.id"
        :description="getTextLastMessage(chat.id)"
        time=""
        messages=""
        @click="handleListItemClick(chat.id)"
      />
    </template>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import ListItem from './list-item/list-item.vue';
import UiGrid from '~/ui/grid/index.vue';
import { State } from '~/store/state.interface';
import { Member } from '~/store/members';
import * as ChatsState from '~/store/chats';

export default Vue.extend({
  components: {
    UiGrid,
    ListItem,
  },
  computed: {
    ...mapState({
      me: (state) => (state as State).me,
      messages: (state) => (state as State).messages.all,
      members: (state) => (state as State).members.all,
      chats: (state) => (state as State).chats.all,
      users: (state) => (state as State).users.all,
      currentChatId: (state) => (state as State).chats.currentChatId,
    }),
    companions() {
      return this.members.filter((member) => member.userId !== this.me.id);
    },
  },
  methods: {
    ...mapActions({
      'setCurrentChat': ChatsState.Actions.SET_CURRENT_CHAT,
    }),
    getTextLastMessage(chatId: string) {
      const messages = this.messages[chatId];

      if (!messages?.length) return '';

      const member = this.members.find(
        (member) => member.userId === this.me.id && member.chatId === chatId,
      );

      const lastChatMessage = messages[0];

      return lastChatMessage.memberId === member.id
        ? `You: ${lastChatMessage.text}`
        : lastChatMessage.text;
    },
    getCompanion(chatId: string) {
      const member = (this.companions as Member[]).find(
        (member) => member.chatId === chatId,
      );

      if (!member) return {};

      return this.users.find((users) => users.id === member.userId);
    },
    async handleListItemClick(chatId: string) {
      await this.setCurrentChat({
        chatId,
      });

      this.$router.push(`/dialogs/${chatId}`);
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
