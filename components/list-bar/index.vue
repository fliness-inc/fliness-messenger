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
    <ui-grid v-if="loading" direction="column" :class="$style.list">
      <ui-grid
        v-for="i in 10"
        :key="i"
        :class="[$style.list_item, $style.list_item_skeleton]"
      >
        <ui-skeleton width="100%" height="60px" radius="4px"></ui-skeleton>
      </ui-grid>
    </ui-grid>
    <ui-grid v-else direction="column" :class="$style.list">
      <list-item
        v-for="chat in chats"
        :key="chat.id"
        :username="getUser(chat.id).name"
        :avatarURL="getUser(chat.id).avatarURL"
        :title="getUser(chat.id).name"
        description=""
        time=""
        messages=""
        @click="handleListItemClick(chat.id)"
      />
    </ui-grid>
    <side-bar-horizontal v-if="showHorizontalSideBar"></side-bar-horizontal>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
/* import Skeleton from './skeleton.vue'; */
import ListItem from './list-item.vue';
import Grid from '~/ui/grid/index.vue';
import Skeleton from '~/ui/skeleton/index.vue';
import Search from '~/components/search/index.vue';
import SideBarHorizontal from '~/components/side-bar/horizontal/index.vue';
import CreateDialogModal from '~/components/dialogs/create-dialog/index.vue';
import { MenuStateEnum } from '~/store/flex/state';
import { GET_CHATS_ACTION } from '~/store/chats/types';
import { ChatTypesEnum } from '~/store/chats/mutations';

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
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      me: (state: any) => state.me,
      menuState: (state: any) => state.flex.menuState,
      chats: (state: any) => state.chats.all,
      members: (state: any) => state.members.all,
      users: (state: any) => state.users.all,
    }),
    showHorizontalSideBar() {
      return this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE;
    },
    companions() {
      return this.members.filter((member) => member.userId !== this.me.id);
    },
  },
  watch: {
    chats() {
      // @ts-ignore
      this.loading = true;
    },
    users() {
      // @ts-ignore
      this.loading = false;
    },
  },
  async mounted() {
    // @ts-ignore
    this.loading = true;

    await this.$store.dispatch(GET_CHATS_ACTION, {
      type: ChatTypesEnum.DIALOG,
    });

    // @ts-ignore
    this.loading = false;
  },
  methods: {
    handleListItemClick() {},
    getUser(chatId: string) {
      // @ts-ignore
      const member = this.companions.find((member) => member.chatId === chatId);
      return this.users.find((users) => users.id === member.userId);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
