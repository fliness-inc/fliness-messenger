import io from 'socket.io-client';
import * as NetworkStatus from '../network-status';
import * as SocketConnectionStatus from '../socket-connection-status';
import * as MembersActions from '../members/actions';
import * as UsersActions from '../users/actions';
import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';

export const NAMESPACE = `messages`;

export const GET_MESSAGES = `${NAMESPACE}/${ActionTypes.GET_MESSAGES}`;
export const SUB_ON_GET_MESSAGES = `${NAMESPACE}/${ActionTypes.CONNECT_SOCKET}`;
export const UNSUB_ON_GET_MESSAGES = `${NAMESPACE}/${ActionTypes.DISCONNECT_SOCKET}`;
export const SEND_MESSAGE = `${NAMESPACE}/${ActionTypes.SEND_MESSAGE}`;
export const SET_MESSAGES = `${NAMESPACE}/${ActionTypes.SET_MESSAGES}`;
export const SET_INIT_STATUS = `${NAMESPACE}/${ActionTypes.SET_INIT_STATUS}`;

let socket;

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
  async [ActionTypes.CONNECT_SOCKET]({ commit }) {
    if (socket) await socket.disconnect();

    socket = await io(`${process.env.NUXT_ENV_API_WS_URL}`, {
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
    });
  },
  async [ActionTypes.DISCONNECT_SOCKET]() {
    if (socket) await socket.disconnect();
  },

  async [ActionTypes.SEND_MESSAGE]({ rootState }, payload) {
    if (!rootState.chats.currentChatId) return;

    await this.$axios.post(
      `/chats/${rootState.chats.currentChatId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      },
    );
  },
  [ActionTypes.SET_MESSAGES]({ commit }, payload) {
    commit(MutationTypes.SET_MESSAGES, payload);
  },
  [ActionTypes.SET_INIT_STATUS]({ commit }, payload) {
    commit(MutationTypes.SET_INIT_STATUS, payload);
  },
};
