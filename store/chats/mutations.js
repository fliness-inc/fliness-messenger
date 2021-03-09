import Vue from 'vue';
import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_CHATS](state, { chats }) {
    chats.forEach((chat) => {
      Vue.set(state.all, chat.id, chat);
    });
  },
  [MutationTypes.SET_CHATS_STATUS](state, { status }) {
    state.networkStatus = status;
  },
  [MutationTypes.CREATE_CHAT](state, { chat }) {
    Vue.set(state.all, chat.id, chat);
  },
  [MutationTypes.SET_CHAT_TYPES](state, { types }) {
    Object.values(state.all).forEach((chat) => {
      Vue.set(state.all, chat.id, {
        ...chat,
        type: types.find((type) => type.id === chat.typeId),
      });
    });
  },
  [MutationTypes.SET_CURRENT_CHAT](state, { chatId }) {
    state.currentChatId = chatId;
  },
  [MutationTypes.SET_INIT_STATUS](state, { status }) {
    state.initStatus = status;
  },
};
