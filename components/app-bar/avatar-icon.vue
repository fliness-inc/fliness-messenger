<template>
  <div class="account__avatar__layout">
    <img v-if="url" :src="url" class="account__avatar" />
    <span v-else class="account__avatar">
      <span>{{ upperSymbolUsername }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AvatarIcon',
  props: {
    url: {
      type: String,
      required: false,
      default: null,
    },
    username: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    upperSymbolUsername() {
      // @ts-ignore
      if (!this.username || !this.username.length) return this.username;

      return this.username[0].toUpperCase();
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
