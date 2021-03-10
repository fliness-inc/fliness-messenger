<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ListItem from './list-item/list-item.vue';
import UiGrid from '~/ui/grid/index.vue';
import * as ChatsActions from '~/store/chats/actions';
import * as FlexActions from '~/store/flex/actions';
import * as MenuStates from '~/store/flex/menu-states';
import * as MessagesActions from '~/store/messages/actions';

export default {
  name: 'List',
  components: {
    UiGrid,
    ListItem,
  },
  computed: {
    ...mapState({
      me: (state) => state.me,
      messages: (state) => state.messages.all,
      members: (state) => state.members.all,
      chats: (state) => Object.values(state.chats.all),
      users: (state) => state.users.all,
      currentChatId: (state) => state.chats.currentChatId,
    }),
    ...mapGetters(['currentChat']),
    companions() {
      return this.members.filter((member) => member.userId !== this.me.id);
    },
  },
  methods: {
    ...mapActions({
      'setCurrentChat': ChatsActions.SET_CURRENT_CHAT,
      'getChats': ChatsActions.GET_CHATS,
      'setMenuState': FlexActions.SET_MENU_STATE,
      'setAllViews': MessagesActions.SET_ALL_VIEWS,
    }),
    getTextLastMessage(chatId) {
      const chatMessages = this.messages[chatId];

      if (!Array.isArray(chatMessages) || !chatMessages.length) return '';

      const member = this.members.find(
        (member) => member.userId === this.me.id && member.chatId === chatId,
      );

      const lastChatMessage = chatMessages[0];

      return lastChatMessage.memberId === member.id
        ? `You: ${lastChatMessage.text}`
        : lastChatMessage.text;
    },
    getCompanion(chatId) {
      const member = this.companions.find((member) => member.chatId === chatId);

      if (!member) return {};

      return this.users[member.userId];
    },
    async handleListItemClick(chatId) {
      await this.setMenuState({ state: MenuStates.NONE });
      await this.setCurrentChat({
        chatId,
      });

      if (this.currentChat.countMessageViews)
        await this.setAllViews({ chatId: this.currentChatId });

      this.$router.push(`/dialogs/${chatId}`);
    },
    getTimeLastMessage(chatId) {
      const chatMessages = this.messages[chatId];

      if (!Array.isArray(chatMessages) || !chatMessages.length) return '';

      const d = new Date(chatMessages[0].createdAt);

      const hours = d.getHours();
      const minutes = d.getMinutes();
      const format = hours > 12 ? 'PM' : 'AM';

      return `${hours}:${minutes} ${format}`;
    },
  },
};
</script>

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

<style lang="scss" src="./index.scss"></style>
