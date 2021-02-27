<template>
  <ui-grid direction="column" :class="$style.list_bar">
    <ui-grid direction="column" :class="$style.list_bar__header">
      <h1 :class="$style.list_bar__title">{{ title }}</h1>
      <search />
      <ui-grid
        align-ttems="center"
        justify="space-between"
        :class="$style.list_bar__btns"
      >
        <create-dialog-modal />
      </ui-grid>
    </ui-grid>
    <ui-grid direction="column" :class="$style.list">
      <template v-for="chat in chats">
        <ui-grid
          v-if="!getUser(chat.id)"
          :key="chat.id"
          :class="[$style.list_item, $style.list_item_skeleton]"
        >
          <ui-skeleton width="100%" height="60px" radius="4px"></ui-skeleton>
        </ui-grid>
        <list-item
          v-else
          :key="chat.id"
          :username="getUser(chat.id).name"
          :avatarURL="getUser(chat.id).avatarURL"
          :title="getUser(chat.id).name"
          :active="currentChatId === chat.id"
          description=""
          time=""
          messages=""
          @click="handleListItemClick(chat.id)"
        />
      </template>
    </ui-grid>

    <side-bar-horizontal v-if="showHorizontalSideBar"></side-bar-horizontal>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import ListItem from './list-item.vue';
import Grid from '~/ui/grid/index.vue';
import Skeleton from '~/ui/skeleton/index.vue';
import Search from '~/components/search/index.vue';
import SideBarHorizontal from '~/components/side-bar/horizontal/index.vue';
import CreateDialogModal from '~/components/dialogs/create-dialog/index.vue';
import { MenuStateEnum } from '~/store/flex/state';
import {
  Actions,
  ChatTypesEnum,
  SetCurrentChatActionPayload,
} from '~/store/chats/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-skeleton': Skeleton,
    'list-item': ListItem,
    search: Search,
    'create-dialog-modal': CreateDialogModal,
    'side-bar-horizontal': SideBarHorizontal,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      me: (state: any) => state.me,
      menuState: (state: any) => state.flex.menuState,
      chats: (state: any) => state.chats.all,
      members: (state: any) => state.members.all,
      users: (state: any) => state.users.all,
      currentChatId: (state: any) => state.chats.currentChatId,
    }),
    showHorizontalSideBar() {
      return this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE;
    },
    companions() {
      return this.members.filter((member) => member.userId !== this.me.id);
    },
  },
  async mounted() {
    await this.$store.dispatch(Actions.GET_CHATS, {
      type: ChatTypesEnum.DIALOG,
    });
  },
  methods: {
    async handleListItemClick(chatId: string) {
      const payload: SetCurrentChatActionPayload = {
        chatId,
      };
      await this.$store.dispatch(Actions.SET_CURRENT_CHAT, payload);

      this.$router.push(`/dialogs/${chatId}`);
    },
    getUser(chatId: string) {
      // @ts-ignore
      const member = this.companions.find((member) => member.chatId === chatId);

      if (!member) return;

      return this.users.find((users) => users.id === member.userId);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
