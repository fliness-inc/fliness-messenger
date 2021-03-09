<script>
import { mapActions, mapState } from 'vuex';
import ListItem from './list-item.vue';
import UiModal from '~/ui/modal/index.vue';
import UiButton from '~/ui/button/index.vue';
import UiGrid from '~/ui/grid/index.vue';
import UiTabs from '~/ui/tabs/index.vue';
import UiTab from '~/ui/tabs/tab.vue';
import UiSkeleton from '~/ui/skeleton/index.vue';
import * as UsersActions from '~/store/users/actions';
import * as ChatsActions from '~/store/chats/actions';
import * as ChatTypes from '~/store/chats/chat-types';

export default {
  components: {
    UiGrid,
    UiButton,
    UiModal,
    UiTabs,
    UiTab,
    UiSkeleton,
    ListItem,
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
      users: (state) => Object.values(state.users.all),
    }),
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    ...mapActions({
      createChat: ChatsActions.CREATE_CHAT,
      getUsers: UsersActions.GET_USERS,
    }),
    handleListItemClick(userId) {
      this.selectedUserId = userId;
    },
    async handleCreateBtnClick() {
      await this.createChat({
        type: ChatTypes.DIALOG,
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
};
</script>

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
                :avatar-url="user.avatarURL"
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

<style lang="scss" module src="./index.module.scss"></style>
