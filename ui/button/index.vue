<template>
  <button
    :class="[$style.btn, $style[`btn_${variant}`]]"
    @click="(e) => this.$emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    variant: {
      type: String,
      required: true,
      validator(val) {
        return ['contained', 'outlined', 'text'].includes(val);
      },
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
