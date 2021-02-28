import { Mutations } from './types';
import { IMutations } from './mutations.interface';

export const mutations: IMutations = {
  [Mutations.Types.SET_MESSAGES](state, payload) {
    state.messagesCurrentChat = payload.messages;
  },
  [Mutations.Types.SET_SOCKET_CONNECTION_STATE](state, payload) {
    state.socketConnectionState = payload.state;
  },
  [Mutations.Types.ADD_NEW_MESSAGE](state, payload) {
    state.messagesCurrentChat = [...state.messagesCurrentChat, payload.message];
  },
};

export default mutations;
