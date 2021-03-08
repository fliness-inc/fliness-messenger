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
        :time="getTimeLastMessage(chat.id)"
        :unreaded="chat.countMessageViews"
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
import * as FlexState from '~/store/flex';

export default Vue.extend({
  name: 'List',
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
      'getChats': ChatsState.Actions.GET_CHATS,
      'setMenuState': FlexState.Actions.SET_MENU_STATE,
    }),
    getTextLastMessage(chatId: string) {
      const chatMessages = this.messages[chatId];

      if (!chatMessages?.length) return '';

      const member = this.members.find(
        (member) => member.userId === this.me.id && member.chatId === chatId,
      );

      const lastChatMessage = chatMessages[0];

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
      await this.setMenuState({ state: FlexState.MenuStateEnum.NONE });
      await this.setCurrentChat({
        chatId,
      });

      this.$router.push(`/dialogs/${chatId}`);
    },
    getTimeLastMessage(chatId: string) {
      const chatMessages = this.messages[chatId];

      if (!chatMessages?.length) return '';

      const d = new Date(chatMessages[0].createdAt);

      const hours = d.getHours();
      const minutes = d.getMinutes();
      const format = hours > 12 ? 'PM' : 'AM';

      return `${hours}:${minutes} ${format}`;
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
