import { MutationTypes } from './types';
import { Mutations } from './mutations.interface';

export const mutations: Mutations = {
  [MutationTypes.GET_CHATS](state, payload) {
    state.all = payload;
  },
  [MutationTypes.CREATE_CHAT](state, payload) {
    state.all = [...state.all, payload];
  },
  [MutationTypes.SET_CHAT_TYPES](state, payload) {
    state.all = state.all.map((chat) => ({
      ...chat,
      type: payload.find((type) => type.id === chat.typeId),
    }));
  },
  [MutationTypes.SET_CURRENT_CHAT](state, payload) {
    state.currentChatId = payload.chatId;
  },
};

export default mutations;
