<script>
import { mapState } from 'vuex';
import Field from '../field/index.vue';
import ErrorField from '../error-field/index.vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
import LogoIcon from '~/assets/logo.svg?inline';
import UnlockIcon from '~/assets/unlock.svg?inline';
import EmailIcon from '~/assets/email.svg?inline';
import * as AuthActions from '~/store/auth/actions';
import * as NetworkStatus from '~/store/network-status';

export default {
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'logo-icon': LogoIcon,
    'form-field': Field,
    'form-error-field': ErrorField,
    'unlock-icon': UnlockIcon,
    'email-icon': EmailIcon,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      isLoading: (state) => state.auth.status === NetworkStatus.LOADING,
    }),
    errorMessage() {
      if (!this.error) return '';

      if (this.error.statusCode === 404) return 'The user was not found';
      else if (this.error.statusCode === 401)
        return 'The email or password is incorrect';

      return 'Something went wrong...';
    },
  },
  methods: {
    handleFieldInput(type, value) {
      switch (type) {
        case 'email':
          this.email = value;
          break;
        case 'password':
          this.password = value;
          break;
      }
    },
    handleFormSubmit() {
      this.$store
        .dispatch(AuthActions.SIGN_IN, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/dialogs');
        });
    },
  },
};
</script>

<template>
  <ui-grid direction="column" align-items="center" :class="$style.form__layout">
    <logo-icon :class="$style.form__icon" />
    <p :class="$style.form__title">Sign in</p>
    <p :class="$style.form__description">to get started</p>
    <form :class="$style.inputs_layout" @submit.prevent="handleFormSubmit">
      <form-error-field v-if="error" :text="errorMessage"></form-error-field>
      <form-field
        type="text"
        placeholder="Email address or phone number"
        @input="(value) => handleFieldInput('email', value)"
      >
        <template #icon>
          <email-icon />
        </template>
      </form-field>
      <form-field
        type="password"
        placeholder="Password"
        @input="(value) => handleFieldInput('password', value)"
      >
        <template #icon>
          <unlock-icon />
        </template>
      </form-field>
      <div :class="$style.form__button_layout">
        <ui-button
          :class="$style.form__button"
          variant="contained"
          :disabled="isLoading"
        >
          Continue
        </ui-button>
      </div>
      <div :class="$style.form__link">
        <NuxtLink to="/sign-up"> or sign up </NuxtLink>
      </div>
    </form>
  </ui-grid>
</template>

<style lang="scss" module src="../index.module.scss"></style>
