<template>
  <ui-grid class="list" direction="column">
    <template v-for="i in 10">
      <ui-grid :key="i" :class="['list_item', 'list_item_skeleton']">
        <ui-skeleton width="100%" height="60px" radius="4px"></ui-skeleton>
      </ui-grid>
    </template>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import UiGrid from '~/ui/grid/index.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';

export default Vue.extend({
  name: 'Skeleton',
  components: {
    UiGrid,
    UiSkeleton,
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
