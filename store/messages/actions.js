import io from 'socket.io-client';
import * as NetworkStatus from '../network-status';
import * as SocketConnectionStatus from '../socket-connection-status';
import * as MembersActions from '../members/actions';
import * as UsersActions from '../users/actions';
import * as ChatsActions from '../chats/actions';
import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';

export const NAMESPACE = `messages`;

export const GET_MESSAGES = `${NAMESPACE}/${ActionTypes.GET_MESSAGES}`;
export const SUB_ON_GET_MESSAGES = `${NAMESPACE}/${ActionTypes.CONNECT_SOCKET}`;
export const UNSUB_ON_GET_MESSAGES = `${NAMESPACE}/${ActionTypes.DISCONNECT_SOCKET}`;
export const SEND_MESSAGE = `${NAMESPACE}/${ActionTypes.SEND_MESSAGE}`;
export const SET_MESSAGES = `${NAMESPACE}/${ActionTypes.SET_MESSAGES}`;
export const SET_INIT_STATUS = `${NAMESPACE}/${ActionTypes.SET_INIT_STATUS}`;
export const SET_ALL_VIEWS = `${NAMESPACE}/${ActionTypes.SET_ALL_VIEWS}`;

let socket = null;

export default {
  [ActionTypes.GET_MESSAGES]({ commit, rootState, dispatch }, { chatId }) {
    commit(MutationTypes.SET_MESSAGES_STATUS, {
      status: NetworkStatus.LOADING,
    });

    return this.$axios
      .get(`/chats/${chatId}/messages`)
      .then(({ data: { data: messages } }) => {
        commit(MutationTypes.SET_MESSAGES, {
          chatId,
          messages,
        });

        return dispatch(
          MembersActions.GET_CHATS_MEMBERS,
          { ids: [chatId] },
          { root: true },
        );
      })
      .then(() => {
        const companions = rootState.members.all.filter(
          (member) => member.userId !== rootState.me.id,
        );

        return dispatch(
          UsersActions.GET_USERS_BY_IDS,
          { ids: companions.map((member) => member.userId) },
          { root: true },
        );
      })
      .then(() =>
        commit(MutationTypes.SET_MESSAGES_STATUS, {
          status: NetworkStatus.SUCCESS,
        }),
      )
      .catch(() =>
        commit(MutationTypes.SET_MESSAGES_STATUS, {
          status: NetworkStatus.ERROR,
        }),
      );
  },
  [ActionTypes.CONNECT_SOCKET]({ commit, rootState, dispatch }) {
    if (socket) socket.close();

    socket = io(`${process.env.NUXT_ENV_API_WS_URL}`, {
      path: '/messages',
    });

    socket.on('connect', () => {
      commit(MutationTypes.SET_SOCKET_CONNECTION_STATE, {
        state: SocketConnectionStatus.CONNECTED,
      });
    });

    socket.on('disconnect', () => {
      commit(MutationTypes.SET_SOCKET_CONNECTION_STATE, {
        state: SocketConnectionStatus.DISCONNECTED,
      });
    });

    socket.on('message-created', (data) => {
      commit(MutationTypes.ADD_NEW_MESSAGE, data);

      if (rootState.chats.networkStatus !== NetworkStatus.LOADING)
        return dispatch(
          ChatsActions.GET_CHAT,
          { id: data.chatId },
          { root: true },
        );
    });
  },
  [ActionTypes.DISCONNECT_SOCKET]() {
    if (socket) {
      socket.close();
      socket = null;
    }
  },

  [ActionTypes.SEND_MESSAGE]({ rootState }, payload) {
    if (!rootState.chats.currentChatId) return;

    return this.$axios.post(
      `/chats/${rootState.chats.currentChatId}/messages`,
      payload,
    );
  },
  [ActionTypes.SET_MESSAGES]({ commit }, payload) {
    commit(MutationTypes.SET_MESSAGES, payload);
  },
  [ActionTypes.SET_INIT_STATUS]({ commit }, payload) {
    commit(MutationTypes.SET_INIT_STATUS, payload);
  },
  [ActionTypes.SET_ALL_VIEWS]({ dispatch }, { chatId }) {
    return this.$axios
      .post(`/chats/${chatId}/messages/views`)
      .then(() =>
        dispatch(ChatsActions.GET_CHAT, { id: chatId }, { root: true }),
      )
      .catch((e) => console.error(e));
  },
};
