<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  components: {
    UiGrid,
  },
};
</script>

<template>
  <ui-grid align-items="center" :class="$style.search">
    <input type="text" placeholder="Search..." />
  </ui-grid>
</template>

<style lang="scss" module src="./index.module.scss"></style>
