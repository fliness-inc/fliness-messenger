<script>
import Grid from '~/ui/grid/index.vue';
import Button from '~/ui/button/index.vue';
import ClipIcon from '~/assets/paper-clip.svg?inline';
import PlaneIcon from '~/assets/paper-plane.svg?inline';
import CameraIcon from '~/assets/camera.svg?inline';
import * as MessagesActions from '~/store/messages/actions';

export default {
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

      this.$store.dispatch(MessagesActions.SEND_MESSAGE, {
        text: this.messageText,
      });

      this.messageText = '';
    },
  },
};
</script>

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
      placeholder="Type your message"
      @keypress.enter="sendMessage"
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

<style lang="scss" module src="./index.module.scss"></style>
