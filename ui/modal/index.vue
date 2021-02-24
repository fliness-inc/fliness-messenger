<template>
  <portal to="modals-location">
    <ui-grid v-if="open" :class="$style.modal">
      <ui-grid
        :class="$style.modal__background"
        @click.native="handleBackgroundClick"
      ></ui-grid>
      <ui-grid :class="$style.modal__content">
        <slot></slot>
      </ui-grid>
    </ui-grid>
  </portal>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleBackgroundClick() {
      this.$emit('close');
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
