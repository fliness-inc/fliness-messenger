<template>
  <Grid align-items="center" justify="space-between" :class="$style.info">
    <img src="~/assets/info.png" :class="$style.phone" />
    <Grid direction="column" :class="$style.info">
      <p :class="[$style.text, $style.text_h1]">Fliness Messenger</p>
      <p :class="[$style.text, $style.text_h2]">
        New Ways to Navigate
        <br />
        Your Messenger
      </p>
      <p :class="[$style.text, $style.text_h3]">
        All of your favorite features,
        <br />
        organized to make it faster <br />
        to find what you want
      </p>
    </Grid>
  </Grid>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';
export default Vue.extend({
  components: { Grid },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
