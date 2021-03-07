<template>
  <ui-grid class="list_item__image_layout">
    <img
      v-if="url"
      :src="url"
      class="list_item__image_root"
      alt="chat avatar"
    />
    <span v-else class="list_item__image_stub">
      <span>{{ getUpperCaseSymbol() }}</span>
    </span>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import UiGrid from '~/ui/grid/index.vue';

export default Vue.extend({
  name: 'AvatarIcon',
  components: {
    UiGrid,
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

<style lang="scss" src="./index.scss"></style>
