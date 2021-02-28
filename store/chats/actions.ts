import { Actions, Mutations, ChatTypesEnum } from './types';
import { IActions } from './actions.interface';
import axios from '~/plugins/axios';
import { GET_CHATS_MEMBERS_ACTION } from '~/store/members/types';
import { GET_USERS_BY_IDS_ACTION } from '~/store/users/types';

export const actions: IActions = {
  async [Actions.Types.GET_CHATS](ctx, payload) {
    const { commit, rootState, state, dispatch } = ctx;
    const res = await axios.get('/me/chats', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(Mutations.Types.GET_CHATS, data);

    await dispatch(Actions.GET_CHAT_TYPES, null, { root: true });

    await dispatch(
      GET_CHATS_MEMBERS_ACTION,
      state.all
        .filter((chat) => chat.type?.name === payload.type)
        .map((chat) => chat.id),
      { root: true }
    );

    const companions = rootState.members.all.filter(
      (member) => member.userId !== rootState.me.id
    );

    await dispatch(
      GET_USERS_BY_IDS_ACTION,
      companions.map((member) => member.userId),
      { root: true }
    );
  },
  async [Actions.Types.CREATE_CHAT](
    { commit, rootState, dispatch, state },
    payload
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
            chat.id === data.id && chat.type?.name === ChatTypesEnum.DIALOG
        )
        .map((chat) => chat.id),
      { root: true }
    );

    const companions = rootState.members.all.filter(
      (member) => member.userId !== rootState.me.id
    );

    await dispatch(
      GET_USERS_BY_IDS_ACTION,
      companions.map((member) => member.userId),
      { root: true }
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
