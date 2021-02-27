<template>
  <main-layout>
    <template #listbar>
      <list-bar title="Dialogs"></list-bar>
    </template>
    <template #content>
      <ui-grid
        direction="column"
        align-items="center"
        justify="center"
        :class="[$style.chat_messages, $style.chat_messages__plug]"
      >
        <ui-grid direction="column" align-items="center" :class="[$style.plug]">
          <dialogs-icon :class="[$style.plug__icon]"></dialogs-icon>
          <p :class="[$style.plug__title]">Please select a dialog</p>
          <p :class="[$style.plug__desc]">to start messaging</p>
        </ui-grid>
      </ui-grid>
    </template>
  </main-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';
import ListBar from '~/components/list-bar/index.vue';
import MainLayout from '~/layouts/main.vue';
// @ts-ignore
import DialogsIcon from '~/assets/chat_bubble_outline.svg?inline';
import * as PagesState from '~/store/pages/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'list-bar': ListBar,
    'main-layout': MainLayout,
    'dialogs-icon': DialogsIcon,
  },
  middleware: ['auth'],
  head() {
    return {
      title: 'Fliness Messenger - Dialogs',
    };
  },
  async mounted() {
    const payload: PagesState.SetPageActionPayload = {
      page: PagesState.Pages.DIALOGS,
    };
    await this.$store.dispatch(PagesState.Actions.SET_PAGE, payload);
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
