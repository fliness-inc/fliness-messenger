<template>
  <ui-grid
    align-items="center"
    justify="center"
    :class="[$style.tabs__tab, $style.tab, { [$style.tab_selected]: active }]"
    @click="() => this.$emit('click', index)"
  >
    <slot></slot>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    active() {
      return this.value === this.index;
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
