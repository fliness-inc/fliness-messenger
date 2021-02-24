<template>
  <ui-grid
    align-items="center"
    justify="space-between"
    wrap="nowrap"
    :class="[$style.list_item, { [$style.list_item_active]: active }]"
    @click="handleClick"
  >
    <ui-grid
      align-items="center"
      justify="space-between"
      :class="$style.list_item__header"
    >
      <div :class="$style.list_item__avatar">
        <avatar-icon :username="username" :url="avatarURL"></avatar-icon>
        <span :class="$style.list_item__status">
          <span :class="$style.list_item__online_status"></span>
        </span>
      </div>
      <ui-grid
        direction="column"
        :justify="
          description && description.length ? 'space-between' : 'center'
        "
        :class="$style.list_item__text"
      >
        <p :class="$style.list_item__title">{{ title }}</p>
        <p
          v-if="description && description.length"
          :class="$style.list_item__desc"
        >
          {{ description }}
        </p>
      </ui-grid>
    </ui-grid>
    <ui-grid
      direction="column"
      justify="space-between"
      :class="$style.list_item__info"
    >
      <p v-if="messages" :class="$style.list_item__nums">
        <span>{{ messages }}</span>
      </p>
      <p
        v-else
        :class="[$style.list_item__nums, $style.list_item__nums_plug]"
      ></p>
      <p :class="$style.list_item__time">
        {{ time }}
      </p>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import AvatarIcon from './avatar-icon.vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'avatar-icon': AvatarIcon,
  },
  props: {
    username: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

<style lang="scss" module src="./index.module.scss"></style>
