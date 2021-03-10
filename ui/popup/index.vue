<script>
import PopupContent from './content.vue';
import UiGrid from '~/ui/grid/index.vue';

export default {
  components: {
    UiGrid,
    PopupContent,
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    anchor: {
      type: Object,
      required: false,
      default: null,
    },
    position: {
      type: String,
      required: false,
      default: 'left-top',
      validator(val) {
        return [
          'left-top',
          'left-bottom',
          'right-top',
          'right-bottom',
        ].includes(val);
      },
    },
  },
  methods: {
    handleBackgroundClick() {
      this.$emit('close');
    },
  },
};
</script>

<template>
  <portal to="modals-location">
    <ui-grid v-if="open" class="popup">
      <ui-grid
        class="popup__background"
        @click="handleBackgroundClick"
      ></ui-grid>
      <popup-content :anchor="anchor" :position="position">
        <slot></slot>
      </popup-content>
    </ui-grid>
  </portal>
</template>

<style lang="scss" src="./index.scss"></style>
