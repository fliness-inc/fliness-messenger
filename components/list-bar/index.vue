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
    <!-- <skeleton></skeleton> -->
    <ui-grid direction="column" :class="$style.list">
      <list-item
        v-for="i in 15"
        :key="i"
        username="He"
        avatarURL=""
        title="fsdf"
        description="fdsfsdf"
        time="12:50 PM"
        messages="5"
        @click="handleListItemClick(i)"
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
import Search from '~/components/search/index.vue';
import SideBarHorizontal from '~/components/side-bar/horizontal/index.vue';
import CreateDialogModal from '~/components/dialogs/create-dialog/index.vue';
import { MenuStateEnum } from '~/store/flex/state';
import { GET_CHATS_ACTION } from '~/store/chats/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    /* skeleton: Skeleton, */
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
      menuState: (state: any) => state.flex.menuState,
      chats: (state: any) => state.chats,
    }),
    showHorizontalSideBar() {
      return this.menuState === MenuStateEnum.MOVING_OVER_WITH_SIDE_BAR_ACTIVE;
    },
  },
  async mounted() {
    await this.$store.dispatch(GET_CHATS_ACTION);
  },
  methods: {
    handleListItemClick() {},
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
