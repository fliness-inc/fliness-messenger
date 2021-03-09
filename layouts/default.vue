<script>
export default {
  head() {
    return {
      bodyAttrs: {
        'data-theme-mode': 'light',
      },
    };
  },
};
</script>

<template>
  <div>
    <Nuxt />
    <portal-target name="modals-location" multiple> </portal-target>
  </div>
</template>
