import {
  GET_CHATS_MEMBERS_ACTION_NAME,
  SET_CHATS_MEMBERS_MUTATION_NAME,
} from './types';
import axios from '~/plugins/axios';

export default {
  [GET_CHATS_MEMBERS_ACTION_NAME]({ commit, rootState }, payload: string[]) {
    if (!payload.length) return;

    return axios
      .get(`/chats/members?chatIds=${payload.join(',')}`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) =>
        commit(SET_CHATS_MEMBERS_MUTATION_NAME, data)
      )
      .catch((e) => console.error(e));
  },
};
