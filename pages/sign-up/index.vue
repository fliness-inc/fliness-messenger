<script>
import Grid from '~/ui/grid/index.vue';
import Info from '~/components/info/index.vue';
import SignUpForm from '~/components/forms/auth/sign-up/index.vue';
import WaveIcon from '~/assets/wave.svg?inline';

export default {
  components: {
    'ui-grid': Grid,
    'info-field': Info,
    'sign-up-form': SignUpForm,
    'wave-icon': WaveIcon,
  },
  head() {
    return {
      title: 'Fliness Messenger - Sign Up',
    };
  },
};
</script>

<template>
  <ui-grid
    direction="column"
    align-items="center"
    justify="center"
    :class="$style.page"
  >
    <wave-icon :class="$style.page__background" />
    <ui-grid
      justify="space-between"
      align-items="center"
      :class="$style.container"
    >
      <info-field />
      <sign-up-form />
    </ui-grid>
  </ui-grid>
</template>

<style module lang="scss" src="./index.module.scss"></style>
