<template>
  <ui-button
    variant="text"
    :class="[$style.menu__item, { [$style.menu__item_active]: active }]"
  >
    <div :class="$style.item__icon">
      <slot></slot>
    </div>
  </ui-button>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '~/ui/button/index.vue';

export default Vue.extend({
  components: {
    'ui-button': Button,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
