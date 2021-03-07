import { Mutations } from './types';
import { IMutations } from './mutations.interface';

export const mutations: IMutations = {
  [Mutations.Types.SET_CHATS](state, payload) {
    state.all = payload;
  },
  [Mutations.Types.SET_CHATS_STATUS](state, payload) {
    state.status = payload.status;
  },

  [Mutations.Types.CREATE_CHAT](state, payload) {
    state.all = [...state.all, payload];
  },
  [Mutations.Types.SET_CHAT_TYPES](state, payload) {
    state.all = state.all.map((chat) => ({
      ...chat,
      type: payload.find((type) => type.id === chat.typeId),
    }));
  },
  [Mutations.Types.SET_CURRENT_CHAT](state, payload) {
    state.currentChatId = payload.chatId;
  },
};

export default mutations;
