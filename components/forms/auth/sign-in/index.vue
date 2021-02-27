<template>
  <ui-grid direction="column" align-items="center" :class="$style.form__layout">
    <logo-icon :class="$style.form__icon" />
    <p :class="$style.form__title">Sign in</p>
    <p :class="$style.form__description">to get started</p>
    <form :class="$style.inputs_layout" @submit.prevent="handleFormSubmit">
      <form-error-field v-if="error" :text="error"></form-error-field>
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
          :disabled="loading"
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

<script lang="ts">
import Vue from 'vue';
import Field from '../field/index.vue';
import ErrorField from '../error-field/index.vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
// @ts-ignore
import LogoIcon from '~/assets/logo.svg?inline';
// @ts-ignore
import UnlockIcon from '~/assets/unlock.svg?inline';
// @ts-ignore
import EmailIcon from '~/assets/email.svg?inline';
import { SIGN_IN_ACTION } from '~/store/auth/types';

export interface Data {
  email: string | null;
  password: string | null;
  error: string | null;
  loading: boolean;
}

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'logo-icon': LogoIcon,
    'form-field': Field,
    'form-error-field': ErrorField,
    'unlock-icon': UnlockIcon,
    'email-icon': EmailIcon,
  },
  data(): Data {
    return {
      email: null,
      password: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    handleFieldInput(type: string, value: string) {
      switch (type) {
        case 'email':
          this.email = value;
          break;
        case 'password':
          this.password = value;
          break;
      }
    },
    async handleFormSubmit() {
      this.loading = true;

      await this.$store
        .dispatch(SIGN_IN_ACTION, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/dialogs');
        })
        .catch(() => {
          this.error = 'The email or password is incorrect';
        })
        .finally(() => (this.loading = false));
    },
  },
});
</script>

<style lang="scss" module src="../index.module.scss"></style>
