<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: false,
      defualt: false,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  watch: {
    checked() {
      this.isChecked = this.checked;
    },
  },
  methods: {
    handleInputChange() {
      this.isChecked = !this.isChecked;
      this.$emit('checked');
    },
  },
};
</script>

<template>
  <span :class="['switch', { 'switch--checked': isChecked }]">
    <span class="switch__base">
      <span class="switch__label">
        <input
          type="checkbox"
          class="switch__input"
          @change="handleInputChange"
        />
        <span class="switch__thumb"></span>
      </span>
      <span class="switch__touch-ripple"></span>
    </span>
    <span class="switch__track"></span>
  </span>
</template>

<style lang="scss" src="./index.scss"></style>
