<template>
  <ui-grid align-items="center" :class="$style.chat_input">
    <ui-button variant="text" :class="$style.chat_input__btn">
      <clip-icon :class="$style.btn__icon" />
    </ui-button>
    <ui-button variant="text" :class="$style.chat_input__btn">
      <camera-icon :class="$style.btn__icon" />
    </ui-button>
    <input
      v-model="messageText"
      type="text"
      :class="$style.chat_input__input"
      @keypress.enter="sendMessage"
      placeholder="Type your message"
    />
    <ui-button
      variant="text"
      :class="$style.chat_input__btn"
      @click="sendMessage"
    >
      <plane-icon :class="$style.btn__icon" />
    </ui-button>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
// @ts-ignore
import ClipIcon from '~/assets/paper-clip.svg?inline';
// @ts-ignore
import PlaneIcon from '~/assets/paper-plane.svg?inline';
// @ts-ignore
import CameraIcon from '~/assets/camera.svg?inline';
import * as MessagesTypes from '~/store/messages/types';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'clip-icon': ClipIcon,
    'plane-icon': PlaneIcon,
    'camera-icon': CameraIcon,
  },
  data() {
    return {
      messageText: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.messageText === '') return;

      const payload: MessagesTypes.Actions.SendMessagePayload = {
        text: this.messageText,
      };

      this.messageText = '';

      this.$store.dispatch(MessagesTypes.Actions.SEND_MESSAGE, payload);
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
