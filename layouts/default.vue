<template>
  <div>
    <Nuxt />
    <portal-target name="modals-location"> </portal-target>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  head() {
    return {
      bodyAttrs: {
        'data-theme-mode': 'light',
      },
    };
  },
});
</script>

<style></style>
