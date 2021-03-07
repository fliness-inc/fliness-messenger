import lodash from 'lodash';
import Vue from 'vue';
import { Mutations, State } from './types';
import { IMutations } from './mutations.interface';

export const updateMessages = (
  state: State,
  payload: Mutations.SetMessagesPayload,
) => {
  const messages = state.all[payload.chatId];

  if (!messages) {
    Vue.set(state.all, payload.chatId, payload.messages);
    return;
  }

  Vue.set(
    state.all,
    payload.chatId,
    lodash.unionBy(messages, payload.messages, 'id').sort((l, r) => {
      const lTime = new Date(l.createdAt).getTime();
      const rTime = new Date(r.createdAt).getTime();

      return lTime < rTime ? 1 : lTime > rTime ? -1 : 0;
    }),
  );
};

export const mutations: IMutations = {
  [Mutations.Types.SET_MESSAGES](state, payload) {
    updateMessages(state, payload);
  },
  [Mutations.Types.SET_MESSAGES_STATUS](state, payload) {
    state.status = payload.status;
  },
  [Mutations.Types.SET_SOCKET_CONNECTION_STATE](state, payload) {
    state.socketConnectionState = payload.state;
  },
  [Mutations.Types.ADD_NEW_MESSAGE](state, payload) {
    updateMessages(state, {
      chatId: payload.chatId,
      messages: [payload.message],
    });
  },
};

export default mutations;
