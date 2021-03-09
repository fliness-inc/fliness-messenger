import lodash from 'lodash';
import Vue from 'vue';
import * as MutationTypes from './mutation-types';

export const updateMessages = (state, chatId, messages) => {
  const localMessages = state.all[chatId];

  if (!localMessages) {
    Vue.set(state.all, chatId, messages);
    return;
  }

  Vue.set(
    state.all,
    chatId,
    lodash.unionBy(localMessages, messages, 'id').sort((l, r) => {
      const lTime = new Date(l.createdAt).getTime();
      const rTime = new Date(r.createdAt).getTime();

      return lTime < rTime ? 1 : lTime > rTime ? -1 : 0;
    }),
  );
};

export default {
  [MutationTypes.SET_MESSAGES](state, { chatId, messages }) {
    updateMessages(state, chatId, messages);
  },
  [MutationTypes.SET_MESSAGES_STATUS](state, { status }) {
    state.networkStatus = status;
  },
  [MutationTypes.SET_SOCKET_CONNECTION_STATE](state, payload) {
    state.socketConnectionState = payload.state;
  },
  [MutationTypes.ADD_NEW_MESSAGE](state, { chatId, message }) {
    updateMessages(state, chatId, [message]);
  },
  [MutationTypes.SET_INIT_STATUS](state, { status }) {
    state.initStatus = status;
  },
};
