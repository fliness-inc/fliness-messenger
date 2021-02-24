<template>
  <ui-grid>
    <ui-button variant="outlined" @click="handleOpenModal">New</ui-button>
    <ui-modal :open="openModal" @close="handleCloseModal">
      <ui-grid
        direction="column"
        align-items="center"
        justify="center"
        :class="$style.modal_form__layout"
      >
        <ui-grid direction="column" :class="$style.modal_form">
          <h1 :class="$style.modal_form__title">Create a Dialog</h1>
          <ui-grid align-items="center" justify="center">
            <ui-tabs :class="$style.modal_form__tabs">
              <ui-tab
                :value="tabIndex"
                :index="1"
                @click="(id) => (this.tabIndex = id)"
              >
                <p :class="$style.tab__title">All Users</p>
              </ui-tab>
              <ui-tab
                :value="tabIndex"
                :index="2"
                @click="(id) => (this.tabIndex = id)"
              >
                <p :class="$style.tab__title">Friends</p>
              </ui-tab>
            </ui-tabs>
          </ui-grid>

          <ui-grid
            v-if="this.tabIndex === 1"
            :class="$style.tab_panel__list"
            direction="column"
          >
            <ui-skeleton width="100%" height="60px" radius="4px" />
            <list-item username="user" avatarURL="" :active="false" />
          </ui-grid>

          <ui-grid
            v-if="this.tabIndex === 2"
            :class="$style.tab_panel__list"
            direction="column"
          >
            <ui-skeleton width="100%" height="60px" radius="4px" />
            <list-item username="user 2" avatarURL="" :active="false" />
          </ui-grid>

          <ui-grid
            align-items="center"
            justify="flex-end"
            :class="$style.modal_form__btns"
          >
            <ui-button
              variant="text"
              :class="$style.btn_cancel"
              @click="handleCloseModal"
            >
              Cancel
            </ui-button>
            <ui-button
              variant="contained"
              :class="$style.btn_create"
              @click="handleCloseModal"
            >
              Create
            </ui-button>
          </ui-grid>
        </ui-grid>
      </ui-grid>
    </ui-modal>
  </ui-grid>
</template>

<script lang="ts">
import Vue from 'vue';
import ListItem from './list-item.vue';
import Modal from '~/ui/modal/index.vue';
import Button from '~/ui/button/index.vue';
import Grid from '~/ui/grid/index.vue';
import Tabs from '~/ui/tabs/index.vue';
import Tab from '~/ui/tabs/tab.vue';
import Skeleton from '~/ui/skeleton/index.vue';

export default Vue.extend({
  components: {
    'ui-grid': Grid,
    'ui-button': Button,
    'ui-modal': Modal,
    'ui-tabs': Tabs,
    'ui-tab': Tab,
    'ui-skeleton': Skeleton,
    'list-item': ListItem,
  },
  data() {
    return {
      openModal: false,
      tabIndex: 1,
    };
  },
  methods: {
    handleOpenModal() {
      this.openModal = true;
    },
    handleCloseModal() {
      this.openModal = false;
    },
  },
});
</script>

<style lang="scss" module src="./index.module.scss"></style>
