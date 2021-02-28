import io from 'socket.io-client';
import { Actions, Mutations, SocketConnectionStateEnum } from './types';
import { IActions } from './actions.interface';
import axios from '~/plugins/axios';

let socket;

export const actions: IActions = {
  [Actions.Types.GET_MESSAGES](ctx, payload) {
    const { commit, rootState } = ctx;

    return axios
      .get(`/chats/${payload.chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => {
        const payload: Mutations.SetMessagesPayload = {
          messages: data,
        };
        commit(Mutations.Types.SET_MESSAGES, payload);
      });
  },
  async [Actions.Types.CONNECT_SOCKET](ctx) {
    const { commit, rootState } = ctx;

    socket = await io(`${process.env.NUXT_ENV_API_WS_URL}`, {
      path: '/messages',
    });

    socket.on('connect', () => {
      const payload: Mutations.SetSocketConnectionStatePayload = {
        state: SocketConnectionStateEnum.CONNECTED,
      };
      commit(Mutations.Types.SET_SOCKET_CONNECTION_STATE, payload);
    });

    socket.on('disconnect', () => {
      const payload: Mutations.SetSocketConnectionStatePayload = {
        state: SocketConnectionStateEnum.DISCONNECTED,
      };
      commit(Mutations.Types.SET_SOCKET_CONNECTION_STATE, payload);
    });

    socket.on('message-created', (data) => {
      if (data.chatId === rootState.chats.currentChatId)
        commit(Mutations.Types.ADD_NEW_MESSAGE, data);
    });
  },
  async [Actions.Types.DISCONNECT_SOCKET]() {
    if (socket) await socket.disconnect();
  },

  async [Actions.Types.SEND_MESSAGE](ctx, payload) {
    const { rootState } = ctx;

    if (!rootState.chats.currentChatId) return;

    await axios.post(
      `/chats/${rootState.chats.currentChatId}/messages`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      }
    );
  },
};

export default actions;
