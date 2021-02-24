<template>
  <span
    :class="[$style.skeleton, $style.skeleton_pulse]"
    :style="{ width, height, borderRadius: radius }"
  >
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    radius: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
