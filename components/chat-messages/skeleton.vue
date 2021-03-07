<template>
  <ui-grid direction="column" :class="$style.message">
    <ui-grid align-items="center" :direction="shift ? 'row-reverse' : 'row'">
      <ui-skeleton width="200px" height="24px" radius="4px"></ui-skeleton>
    </ui-grid>
    <ui-grid
      justify="center"
      direction="column"
      :align-items="shift ? 'flex-end' : 'flex-start'"
    >
      <ui-grid
        align-items="center"
        :direction="shift ? 'row-reverse' : 'row'"
        :class="[$style.message__text_skeleton]"
      >
        <ui-skeleton width="400px" height="100px" radius="4px"></ui-skeleton>
      </ui-grid>
    </ui-grid>
    <ui-grid
      justify="center"
      direction="column"
      :align-items="shift ? 'flex-end' : 'flex-start'"
    >
      <ui-grid align-items="center" :direction="shift ? 'row-reverse' : 'row'">
        <ui-skeleton width="70px" height="20px" radius="4px"></ui-skeleton>
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
import Skeleton from '~/ui/skeleton/index.vue';
import Grid from '~/ui/grid/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-skeleton': Skeleton,
  },
  props: {
    shift: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
