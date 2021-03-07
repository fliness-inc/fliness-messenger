<template>
  <ui-button
    variant="text"
    :class="['menu__item', { 'menu__item_active': active }]"
    @click="$emit('click')"
  >
    <div class="item__icon">
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

<style lang="scss" src="./index.scss"></style>
