<script>
import UiGrid from '~/ui/grid/index.vue';

export default {
  components: {
    UiGrid,
  },
  props: {
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
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  computed: {
    root() {
      return this.anchor.root.getBoundingClientRect();
    },
  },
  mounted() {
    this.updatePos();
  },
  methods: {
    updatePos() {
      if (!this.anchor || !this.$refs.content) return;

      const rect = this.$refs.content.$el.getBoundingClientRect();
      const x =
        this.position === 'left-top' || this.position === 'left-bottom'
          ? this.root.left
          : this.root.left + this.root.width;
      const y =
        this.position === 'left-top' || this.position === 'right-top'
          ? this.root.top
          : this.root.top + this.root.height;
      const width = this.root.width;
      const height = this.root.height;

      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      const diffX = x + rect.width > maxWidth ? maxWidth - x - rect.width : 0;
      const diffY =
        y + rect.height > maxHeight ? maxHeight - y - rect.height : 0;

      if (diffX < 0) this.x = `${x - rect.width + width}px`;
      else this.x = `${x}px`;

      if (diffY < 0) this.y = `${y - rect.height + height}px`;
      else this.y = `${y}px`;
    },
  },
};
</script>

<template>
  <ui-grid ref="content" class="popup__content" :style="{ left: x, top: y }">
    <slot></slot>
  </ui-grid>
</template>

<style lang="scss" src="./index.scss"></style>
