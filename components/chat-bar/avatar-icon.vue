<script>
export default {
  name: 'AvatarIcon',
  props: {
    url: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
  },
  computed: {
    upperSymbolUsername() {
      if (!this.username || !this.username.length) return '';
      return this.username[0].toUpperCase();
    },
  },
};
</script>

<template>
  <div>
    <img v-if="url" :src="url" class="chatbar__avatar_img" />
    <span v-else class="chatbar__avatar_plug">
      <span>{{ upperSymbolUsername }}</span>
    </span>
  </div>
</template>

<style lang="scss" module src="./index.scss"></style>
