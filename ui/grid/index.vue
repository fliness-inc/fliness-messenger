<template>
  <div
    :class="{
      'grid': true,
      [`grid_dir-${direction}`]: direction,
      [`grid_justify-${justify}`]: justify,
      [`grid_align-${alignItems}`]: alignItems,
    }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'UiGrid',
  props: {
    justify: {
      type: String,
      default: 'flex-start',
      validator(val) {
        return [
          'center',
          'start',
          'center',
          'end',
          'flex-start',
          'flex-end',
          'space-between',
          'space-around',
        ].includes(val);
      },
    },
    alignItems: {
      type: String,
      default: 'flex-start',
      validator(val) {
        return [
          'center',
          'start',
          'center',
          'end',
          'flex-start',
          'flex-end',
          'space-between',
          'space-around',
        ].includes(val);
      },
    },
    wrap: {
      type: String,
      default: 'nowrap',
      validator(val) {
        return ['nowrap', 'wrap', 'wrap-reverse'].includes(val);
      },
    },
    direction: {
      type: String,
      default: 'row',
      validator(val) {
        return ['row', 'column', 'row-reverse', 'column-reverse'].includes(val);
      },
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
