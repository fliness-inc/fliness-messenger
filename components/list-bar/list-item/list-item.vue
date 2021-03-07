<template>
  <ui-grid
    align-items="center"
    justify="space-between"
    wrap="nowrap"
    :class="['list_item', { 'list_item__active': active }]"
    @click="handleClick"
  >
    <ui-grid
      align-items="center"
      justify="space-between"
      class="list_item__header"
    >
      <div class="list_item__avatar">
        <avatar-icon :username="username" :url="avatarUrl"></avatar-icon>
        <span class="list_item__status">
          <span class="list_item__online_status"></span>
        </span>
      </div>
      <ui-grid
        direction="column"
        :justify="
          description && description.length ? 'space-between' : 'center'
        "
        class="list_item__text"
      >
        <p class="list_item__title">{{ title }}</p>
        <p v-if="description && description.length" class="list_item__desc">
          {{ description }}
        </p>
      </ui-grid>
    </ui-grid>
    <ui-grid direction="column" justify="space-between" class="list_item__info">
      <p v-if="messages" class="list_item__nums">
        <span>{{ messages }}</span>
      </p>
      <p v-else :class="['list_item__nums', 'list_item__nums_plug']"></p>
      <p class="list_item__time">
        {{ time }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import AvatarIcon from '../avatar-icon.vue';
import UiGrid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    UiGrid,
    AvatarIcon,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: null,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
});
</script>

<style lang="scss" src="./index.scss"></style>
