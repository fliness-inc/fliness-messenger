<script>
import UiGrid from '~/ui/grid/index.vue';
import Info from '~/components/info/index.vue';
import SignInForm from '~/components/forms/auth/sign-in/index.vue';
import WaveIcon from '~/assets/wave.svg?inline';

export default {
  name: 'SignInPage',
  components: {
    UiGrid,
    Info,
    SignInForm,
    WaveIcon,
  },
  head() {
    return {
      title: 'Fliness Messenger - Sign In',
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
      <info />
      <sign-in-form />
    </ui-grid>
  </ui-grid>
</template>

<style module lang="scss" src="./index.module.scss"></style>
