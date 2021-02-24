<template>
  <ui-grid :class="$style.list" direction="column">
    <ui-grid
      v-for="i in 10"
      :key="i"
      :class="[$style.list_item, $style.list_item_skeleton]"
    >
      <ui-skeleton width="100%" height="60px" radius="4px"></ui-skeleton>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';
import Skeleton from '~/ui/skeleton/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-skeleton': Skeleton,
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
