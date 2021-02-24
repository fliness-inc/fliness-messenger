<template>
  <div :class="$style.error">
    <div :class="$style.error__icon">
      <padlock-icon />
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import PadlockIcon from '~/assets/padlock.svg?inline';

export default Vue.extend({
  name: 'Field',
  components: {
    'padlock-icon': PadlockIcon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
