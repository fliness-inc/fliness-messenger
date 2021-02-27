import {
  GET_CHATS_ACTION_NAME,
  CREATE_CHAT_ACTION_NAME,
  GET_CHATS_MUTATION_NAME,
  CREATE_CHAT_MUTATION_NAME,
  GET_CHAT_TYPES_ACTION_NAME,
  SET_CHAT_TYPES_MUTATION_NAME,
  GET_CHAT_TYPES_ACTION,
} from './types';
import { ChatTypesEnum } from './mutations';
import axios from '~/plugins/axios';
import { GET_CHATS_MEMBERS_ACTION } from '~/store/members/types';
import { GET_USERS_BY_IDS_ACTION } from '~/store/users/types';

export default {
  async [GET_CHATS_ACTION_NAME](
    { commit, rootState, state, dispatch },
    payload
  ) {
    const res = await axios.get('/me/chats', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(GET_CHATS_MUTATION_NAME, data);

    await dispatch(GET_CHAT_TYPES_ACTION, null, { root: true });

    await dispatch(
      GET_CHATS_MEMBERS_ACTION,
      state.all
        .filter((chat) => chat.type.name === payload.type)
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
  async [CREATE_CHAT_ACTION_NAME](
    { commit, rootState, dispatch, state },
    payload
  ) {
    const res = await axios.post('/chats', payload, {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(CREATE_CHAT_MUTATION_NAME, data);

    await dispatch(GET_CHAT_TYPES_ACTION, null, { root: true });

    await dispatch(
      GET_CHATS_MEMBERS_ACTION,
      state.all
        .filter(
          (chat) =>
            chat.id === data.id && chat.type.name === ChatTypesEnum.DIALOG
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
  async [GET_CHAT_TYPES_ACTION_NAME]({ commit, rootState }) {
    const res = await axios.get('/chats/types', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;

    commit(SET_CHAT_TYPES_MUTATION_NAME, data);
  },
};
