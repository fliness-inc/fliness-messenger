<template>
  <div :class="$style.avatar">
    <img v-if="url" :src="url" :class="$style.avatar__icon" />
    <span v-else :class="$style.avatar__icon_plug">
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
