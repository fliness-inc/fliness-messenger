<template>
  <ui-grid :class="$style.list_item__image_layout">
    <img
      v-if="url"
      :src="url"
      alt="chat avatar"
      :class="$style.list_item__image_root"
    />
    <span v-else :class="$style.list_item__image_stub">
      <span>{{ getUpperCaseSymbol() }}</span>
    </span>
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
    url: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
    },
  },
  methods: {
    getUpperCaseSymbol() {
      return this.username[0].toUpperCase();
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
