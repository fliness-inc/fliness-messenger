<script>
import AvatarIcon from './avatar-icon.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  name: 'ListItem',
  components: {
    UiGrid,
    AvatarIcon,
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
    avatarUrl: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  computed: {
    formatedTime() {
      const d = new Date(this.time);

      const hours = d.getHours();
      const minutes = d.getMinutes();
      const format = hours > 12 ? 'PM' : 'AM';

      return `${hours}:${minutes} ${format}`;
    },
  },
};
</script>

<template>
  <ui-grid direction="column" :class="$style.message">
    <ui-grid align-items="center" :direction="shift ? 'row-reverse' : 'row'">
      <avatar-icon :username="username" :url="avatarUrl" />
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

<style lang="scss" module src="./index.module.scss"></style>
