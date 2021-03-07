import { Actions, Mutations, ChatTypesEnum } from './types';
import { IActions } from './actions.interface';
import axios from '~/plugins/axios';
import { GET_CHATS_MEMBERS_ACTION } from '~/store/members/types';
import { GET_USERS_BY_IDS_ACTION } from '~/store/users/types';
import { Status } from '~/store/utils';
import * as MessagesState from '~/store/messages';

export const actions: IActions = {
  [Actions.Types.GET_CHATS](ctx, payload) {
    const { commit, rootState, state, dispatch } = ctx;

    commit(Mutations.Types.SET_CHATS_STATUS, { status: Status.LOADING });

    return axios
      .get('/me/chats', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then((res) => {
        const { data: chats } = res.data;
        commit(Mutations.Types.SET_CHATS, chats);
      })
      .then(() =>
        dispatch(
          GET_CHATS_MEMBERS_ACTION,
          state.all
            .filter((chat) => chat.type?.name === payload.type)
            .map((chat) => chat.id),
          { root: true },
        ),
      )
      .then(() => {
        const companions = rootState.members.all.filter(
          (member) => member.userId !== rootState.me.id,
        );

        return dispatch(
          GET_USERS_BY_IDS_ACTION,
          companions.map((member) => member.userId),
          { root: true },
        );
      })
      .then(async () => {
        const chats = state.all.filter(
          (chat) => chat.type?.name === payload.type,
        );

        for (const chat of chats) {
          const payload: MessagesState.Actions.SetMessagesPayload = {
            chatId: chat.id,
            messages: chat.messages,
          };
          await dispatch(MessagesState.Actions.SET_MESSAGES, payload, {
            root: true,
          });
        }
      })
      .then(() =>
        commit(Mutations.Types.SET_CHATS_STATUS, { status: Status.SUCCESS }),
      )
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
      GET_USERS_BY_IDS_ACTION,
      companions.map((member) => member.userId),
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
