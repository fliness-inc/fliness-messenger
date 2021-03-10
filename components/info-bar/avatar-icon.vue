<script>
export default {
  name: 'AvatarIcon',
  props: {
    username: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    upperSymbolUsername() {
      if (!this.username || !this.username.length) return this.username;
      return this.username[0].toUpperCase();
    },
  },
};
</script>

<template>
  <div class="avatar">
    <img v-if="url" :src="url" class="avatar__icon" />
    <span v-else class="avatar__icon">
      <span>{{ upperSymbolUsername }}</span>
    </span>
  </div>
</template>

<style lang="scss" src="./index.scss"></style>
