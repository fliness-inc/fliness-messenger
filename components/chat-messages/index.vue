<template>
  <ui-grid direction="column" :class="$style.chat_messages">
    <list-item
      username="username"
      text="some text"
      :time="new Date()"
    ></list-item>
    <list-item
      username="username"
      text="some text"
      :time="new Date()"
      :shift="true"
    ></list-item>
    <list-item
      username="username"
      text="some text"
      :time="new Date()"
    ></list-item>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import ListItem from './list-items.vue';
import Grid from '~/ui/grid/index.vue';
/* import Button from '~/ui/button/index.vue'; */

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'list-item': ListItem,
    /* 'ui-button': Button, */
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
