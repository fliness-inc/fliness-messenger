import io from 'socket.io-client';
import { Actions, Mutations, SocketConnectionStateEnum } from './types';
import { IActions } from './actions.interface';
import { Status } from '~/store/utils';
import axios from '~/plugins/axios';

let socket;

export const actions: IActions = {
  [Actions.Types.GET_MESSAGES](ctx, payload) {
    const { commit, rootState } = ctx;
    const { chatId } = payload;

    commit(Mutations.Types.SET_MESSAGES_STATUS, { status: Status.LOADING });

    return axios
      .get(`/chats/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => {
        const payload: Mutations.SetMessagesPayload = {
          chatId: <string>chatId,
          messages: data,
        };
        commit(Mutations.Types.SET_MESSAGES, payload);
        commit(Mutations.Types.SET_MESSAGES_STATUS, { status: Status.SUCCESS });
      })
      .catch(() => {
        commit(Mutations.Types.SET_MESSAGES_STATUS, { status: Status.ERROR });
      });
  },
  async [Actions.Types.CONNECT_SOCKET](ctx) {
    const { commit } = ctx;

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
      },
    );
  },
  [Actions.Types.SET_MESSAGES](ctx, payload) {
    const { commit } = ctx;
    return commit(Mutations.Types.SET_MESSAGES, payload);
  },
};

export default actions;
