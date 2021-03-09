<script>
import UiGrid from '~/ui/grid/index.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';

export default {
  name: 'Skeleton',
  components: {
    UiGrid,
    UiSkeleton,
  },
  methods: {
    isShift(index) {
      return index % 3 === 0;
    },
  },
};
</script>

<template>
  <ui-grid :class="$style.chat_messages" direction="column-reverse">
    <ui-grid
      v-for="i in 10"
      :key="i"
      :class="$style.message"
      direction="column"
    >
      <ui-grid
        align-items="center"
        :direction="isShift(i) ? 'row-reverse' : 'row'"
      >
        <ui-skeleton width="200px" height="24px" radius="4px"></ui-skeleton>
      </ui-grid>
      <ui-grid
        justify="center"
        direction="column"
        :align-items="isShift(i) ? 'flex-end' : 'flex-start'"
      >
        <ui-grid
          align-items="center"
          :direction="isShift(i) ? 'row-reverse' : 'row'"
          :class="[$style.message__text_skeleton]"
        >
          <ui-skeleton width="400px" height="100px" radius="4px"></ui-skeleton>
        </ui-grid>
      </ui-grid>
      <ui-grid
        justify="center"
        direction="column"
        :align-items="isShift(i) ? 'flex-end' : 'flex-start'"
      >
        <ui-grid
          align-items="center"
          :direction="isShift(i) ? 'row-reverse' : 'row'"
        >
          <ui-skeleton width="70px" height="20px" radius="4px"></ui-skeleton>
          <ui-grid align-items="center" :class="$style.message__loading">
            <!-- {!shift ? null : ( /*<CheckIcon
          className={classes['message__loading_process']} />*/ <ChecksIcon
          className={classes['message__loading_done']} /> )} -->
          </ui-grid>
        </ui-grid>
      </ui-grid>
    </ui-grid>
  </ui-grid>
</template>

<style lang="scss" module src="./index.module.scss"></style>
