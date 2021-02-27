<template>
  <div>
    <img v-if="url" :src="url" :class="$style.chatbar__avatar_img" />
    <span v-else :class="$style.chatbar__avatar_plug">
      <span>{{ upperSymbolUsername }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    url: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
  },
  computed: {
    upperSymbolUsername() {
      if (!this.username || !this.username.length) return '';

      return this.username[0].toUpperCase();
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
