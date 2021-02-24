<template>
  <div :class="$style.account__avatar__layout">
    <img v-if="url" :src="url" :class="$style.account__avatar" />
    <span v-else :class="$style.account__avatar">
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
      required: true,
    },
  },
  computed: {
    upperSymbolUsername() {
      return this.username[0].toUpperCase();
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
