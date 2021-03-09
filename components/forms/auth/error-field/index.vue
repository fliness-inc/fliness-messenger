<script>
import PadlockIcon from '~/assets/padlock.svg?inline';

export default {
  name: 'Field',
  components: {
    PadlockIcon,
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div :class="$style.error">
    <div :class="$style.error__icon">
      <padlock-icon />
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" module src="./index.module.scss"></style>
