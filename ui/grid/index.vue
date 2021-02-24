<template>
  <div
    :class="{
      [$style.grid]: true,
      [$style[`grid_dir-${direction}`]]: direction,
      [$style[`grid_justify-${justify}`]]: justify,
      [$style[`grid_align-${alignItems}`]]: alignItems,
    }"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
        return ['row', 'column', 'row-reverse', 'column-revers'].includes(val);
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

<style lang="scss" module src="./index.module.scss"></style>
