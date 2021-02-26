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
                @click="(id) => (tabIndex = id)"
              >
                <p :class="$style.tab__title">All Users</p>
              </ui-tab>
              <ui-tab
                :value="tabIndex"
                :index="2"
                @click="(id) => (tabIndex = id)"
              >
                <p :class="$style.tab__title">Friends</p>
              </ui-tab>
            </ui-tabs>
          </ui-grid>

          <ui-grid
            v-if="tabIndex === 1"
            :class="$style.tab_panel__list"
            direction="column"
          >
            <ui-grid v-if="!users.length" direction="column">
              <ui-skeleton
                v-for="i in 10"
                :key="i"
                :class="$style.list_item"
                width="100%"
                height="60px"
                radius="4px"
              />
            </ui-grid>
            <ui-grid v-else direction="column">
              <list-item
                v-for="user in users"
                :key="user.id"
                :username="user.name"
                :avatarURL="user.avatarURL"
                :active="user.id === selectedUserId"
                @click="handleListItemClick(user.id)"
              />
            </ui-grid>
          </ui-grid>

          <ui-grid
            v-if="tabIndex === 2"
            :class="$style.tab_panel__list"
            direction="column"
          >
            List Empty
          </ui-grid>

          <ui-grid
            align-items="center"
            justify="flex-end"
            :class="$style.modal_form__btns"
          >
            <ui-button
              variant="text"
              :class="$style.btn_cancel"
              @click="handleCancelBtnClick"
            >
              Cancel
            </ui-button>
            <ui-button
              variant="contained"
              :class="$style.btn_create"
              :disabled="selectedUserId === null"
              @click="handleCreateBtnClick"
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
import { mapState } from 'vuex';
import ListItem from './list-item.vue';
import Modal from '~/ui/modal/index.vue';
import Button from '~/ui/button/index.vue';
import Grid from '~/ui/grid/index.vue';
import Tabs from '~/ui/tabs/index.vue';
import Tab from '~/ui/tabs/tab.vue';
import Skeleton from '~/ui/skeleton/index.vue';
import { GET_USERS_ACTION } from '~/store/users/types';
import { CREATE_CHAT_ACTION } from '~/store/chats/types';
import { ChatTypesEnum } from '~/store/chats/mutations';

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
      selectedUserId: null,
    };
  },
  computed: {
    ...mapState({
      users: (state: any) => state.users.allUsers,
    }),
  },
  async mounted() {
    await this.$store.dispatch(GET_USERS_ACTION);
  },
  methods: {
    handleListItemClick(userId) {
      this.selectedUserId = userId;
    },
    async handleCreateBtnClick() {
      await this.$store.dispatch(CREATE_CHAT_ACTION, {
        type: ChatTypesEnum.DIALOG,
        userIds: [this.selectedUserId],
      });

      this.openModal = false;
    },
    handleCancelBtnClick() {
      this.openModal = false;
    },
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
