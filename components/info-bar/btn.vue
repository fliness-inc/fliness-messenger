<script>
import UiGrid from '~/ui/grid/index';
import UiButton from '~/ui/button/index';

export default {
  name: 'Btn',
  components: {
    UiGrid,
    UiButton,
  },
};
</script>

<template>
  <ui-button variant="text" class="btn">
    <ui-grid class="btn__layout" align-items="center" justify="space-between">
      <ui-grid align-items="center">
        <slot name="icon"></slot>
        <p class="btn__title"><slot name="text"></slot></p>
      </ui-grid>
      <ui-grid class="btn__badge" justify="flex-end">
        <slot name="badge"></slot>
      </ui-grid>
    </ui-grid>
  </ui-button>
</template>

<style lang="scss" src="./index.scss"></style>
