import { Actions, Mutations, ChatTypesEnum } from './types';
import { IActions } from './actions.interface';
import axios from '~/plugins/axios';
import { GET_CHATS_MEMBERS_ACTION } from '~/store/members';
import * as UsersState from '~/store/users';
import * as MessagesState from '~/store/messages';
import { Status } from '~/store/utils';

export const actions: IActions = {
  [Actions.Types.GET_CHATS](ctx) {
    const { commit, rootState, dispatch } = ctx;

    commit(Mutations.Types.SET_CHATS_STATUS, { status: Status.LOADING });

    return axios
      .get('/me/chats', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then((res) => {
        const { data: chats } = res.data;
        return chats;
      })
      .then(async (chats) => {
        await dispatch(
          GET_CHATS_MEMBERS_ACTION,
          chats.map((chat) => chat.id),
          { root: true },
        );
        return chats;
      })
      .then(async (chats) => {
        const companions = rootState.members.all.filter(
          (member) => member.userId !== rootState.me.id,
        );

        await dispatch(
          UsersState.Actions.GET_USERS_BY_IDS,
          { ids: companions.map((member) => member.userId) },
          { root: true },
        );

        return chats;
      })
      .then(async (chats) => {
        for (const chat of chats) {
          await dispatch(
            MessagesState.Actions.SET_MESSAGES,
            {
              chatId: chat.id,
              messages: chat.messages,
            },
            {
              root: true,
            },
          );
        }
        return chats;
      })
      .then((chats) => {
        commit(Mutations.Types.SET_CHATS, chats);
        commit(Mutations.Types.SET_CHATS_STATUS, { status: Status.SUCCESS });
      })
      .catch(() =>
        commit(Mutations.Types.SET_CHATS_STATUS, { status: Status.ERROR }),
      );
  },
  async [Actions.Types.CREATE_CHAT](
    { commit, rootState, dispatch, state },
    payload,
  ) {
    const res = await axios.post('/chats', payload, {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(Mutations.Types.CREATE_CHAT, data);

    await dispatch(Actions.GET_CHAT_TYPES, null, { root: true });

    await dispatch(
      GET_CHATS_MEMBERS_ACTION,
      state.all
        .filter(
          (chat) =>
            chat.id === data.id && chat.type?.name === ChatTypesEnum.DIALOG,
        )
        .map((chat) => chat.id),
      { root: true },
    );

    const companions = rootState.members.all.filter(
      (member) => member.userId !== rootState.me.id,
    );

    await dispatch(
      UsersState.Actions.GET_USERS_BY_IDS,
      { ids: companions.map((member) => member.userId) },
      { root: true },
    );
  },
  async [Actions.Types.GET_CHAT_TYPES](ctx) {
    const { commit, rootState } = ctx;
    const res = await axios.get('/chats/types', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(Mutations.Types.SET_CHAT_TYPES, data);
  },
  async [Actions.Types.SET_CURRENT_CHAT](ctx, payload) {
    const { commit } = ctx;
    await commit(Mutations.Types.SET_CURRENT_CHAT, payload);
  },
};

export default actions;
