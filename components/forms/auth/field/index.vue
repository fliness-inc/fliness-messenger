<template>
  <div :class="$style.input">
    <div :class="$style.input__icon">
      <slot name="icon"></slot>
    </div>
    <input
      v-model="value"
      :type="type"
      :class="$style.input__shape"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Field',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: null,
    };
  },
  watch: {
    value() {
      this.$emit('input', this.value);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
