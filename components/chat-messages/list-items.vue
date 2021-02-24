<template>
  <ui-grid direction="column" :class="$style.message">
    <ui-grid align-items="center" :direction="shift ? 'row-reverse' : 'row'">
      <avatar-icon :username="username" url="" />
      <p :class="$style.avatar__name">{{ username }}</p>
      <!-- <EditButton /> -->
    </ui-grid>
    <ui-grid
      justify="center"
      direction="column"
      :align-items="shift ? 'flex-end' : 'flex-start'"
    >
      <ui-grid
        align-items="center"
        :direction="shift ? 'row-reverse' : 'row'"
        :class="[
          $style.message__text,
          { [$style.message__primary_text]: shift },
        ]"
      >
        <p>{{ text }}</p>
      </ui-grid>
    </ui-grid>
    <ui-grid
      justify="center"
      direction="column"
      :align-items="shift ? 'flex-end' : 'flex-start'"
    >
      <ui-grid align-items="center" :direction="shift ? 'row-reverse' : 'row'">
        <span :class="$style.message__time"> {{ formatedTime }} </span>
        <ui-grid align-items="center" :class="$style.message__loading">
          <!-- {!shift ? null : ( /*<CheckIcon
          className={classes['message__loading_process']} />*/ <ChecksIcon
          className={classes['message__loading_done']} /> )} -->
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import AvatarIcon from './avatar-icon.vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    /* 'ui-button': Button, */
    'avatar-icon': AvatarIcon,
  },
  props: {
    shift: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  },
  computed: {
    formatedTime() {
      const t: Date = <any>this.time;

      return `${t.getHours()}:${t.getMinutes()} ${
        t.getHours() >= 12 ? 'PM' : 'AM'
      }`;
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
