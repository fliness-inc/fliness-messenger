<script>
import Field from '../field/index.vue';
import ErrorField from '../error-field/index.vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
import LogoIcon from '~/assets/logo.svg?inline';
import UnlockIcon from '~/assets/unlock.svg?inline';
import EmailIcon from '~/assets/email.svg?inline';
import UserIcon from '~/assets/user.svg?inline';
import * as AuthActions from '~/store/auth/actions';

export default {
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'logo-icon': LogoIcon,
    'form-field': Field,
    'form-error-field': ErrorField,
    'unlock-icon': UnlockIcon,
    'email-icon': EmailIcon,
    'user-icon': UserIcon,
  },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      repeatPassword: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    handleFieldInput(type, value) {
      switch (type) {
        case 'username':
          this.username = value;
          break;
        case 'email':
          this.email = value;
          break;
        case 'password':
          this.password = value;
          break;
        case 'repeat-password':
          this.repeatPassword = value;
          break;
      }
    },
    async handleFormSubmit() {
      if (this.password !== this.repeatPassword) {
        this.error = 'The passwords are not match';
        return;
      }

      this.loading = true;

      await this.$store
        .dispatch(AuthActions.SIGN_UP, {
          name: this.username,
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
};
</script>

<template>
  <ui-grid direction="column" align-items="center" :class="$style.form__layout">
    <logo-icon :class="$style.form__icon" />
    <p :class="$style.form__title">Sign up</p>
    <p :class="$style.form__description">to get started</p>
    <form :class="$style.inputs_layout" @submit.prevent="handleFormSubmit">
      <form-error-field v-if="error" :text="error"></form-error-field>
      <form-field
        type="text"
        placeholder="Username"
        @input="(value) => handleFieldInput('username', value)"
      >
        <template #icon>
          <user-icon />
        </template>
      </form-field>
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
      <form-field
        type="password"
        placeholder="Repeat password"
        @input="(value) => handleFieldInput('repeat-password', value)"
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
        <NuxtLink to="/sign-in"> or sign in </NuxtLink>
      </div>
    </form>
  </ui-grid>
</template>

<style lang="scss" module src="../index.module.scss"></style>
