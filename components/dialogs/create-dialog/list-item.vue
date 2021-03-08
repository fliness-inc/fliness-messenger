<template>
  <ui-grid
    align-items="center"
    justify="space-between"
    wrap="nowrap"
    :class="$style.list_item"
    @click="$emit('click')"
  >
    <ui-button
      variant="contained"
      :class="[
        $style.list_item__btn,
        { [$style.list_item__btn_active]: active },
      ]"
    >
      <ui-grid align-items="center" :class="$style.list_item__header">
        <div :class="$style.list_item__avatar">
          <div :class="$style.list_item__image">
            <img
              v-if="avatarUrl"
              :class="$style.list_item__image"
              :src="avatarUrl"
              alt="user avatar"
            />
            <span v-else> {{ upperCaseFirstSymbol }} </span>
          </div>
          <span :class="$style.list_item__status">
            <span :class="$style.list_item__online_status"></span>
          </span>
        </div>
        <p :class="$style.list_item__title">{{ username }}</p>
      </ui-grid>
    </ui-button>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import Button from '~/ui/button/index.vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
  },
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
    },
  },
  computed: {
    upperCaseFirstSymbol() {
      return this.username[0].toUpperCase();
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
