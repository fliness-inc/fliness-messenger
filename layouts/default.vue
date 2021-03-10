<script>
import { mapActions, mapState } from 'vuex';
import * as MeActions from '~/store/me/actions';
import * as Themes from '~/store/me/themes';

export default {
  fetch() {
    if (!this.$cookies.get('theme-mode')) {
      this.$cookies.set('theme-mode', Themes.LIGHT);
      return this.setTheme({ theme: Themes.LIGHT });
    }

    return this.setTheme({ theme: this.$cookies.get('theme-mode') });
  },
  computed: {
    ...mapState({
      theme: (state) => state.me.theme,
    }),
  },
  watch: {
    theme() {
      this.$cookies.set('theme-mode', this.theme);
    },
  },
  methods: {
    ...mapActions({
      'setTheme': MeActions.SET_THEME,
    }),
  },
};
</script>

<template>
  <div class="page" :data-theme-mode="theme">
    <Nuxt />
    <portal-target name="modals-location" multiple> </portal-target>
  </div>
</template>
