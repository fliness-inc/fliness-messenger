<template>
  <ui-grid align-items="center" :class="$style.tabs">
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
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
