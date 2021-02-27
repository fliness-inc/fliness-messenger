import {
  GET_USERS_ACTION_NAME,
  GET_USERS_BY_IDS_ACTION_NAME,
  SET_USERS_MUTATION_NAME,
} from './types';
import axios from '~/plugins/axios';

export default {
  [GET_USERS_ACTION_NAME]({ commit }) {
    return axios
      .get('/users')
      .then(({ data: { data } }) => commit(SET_USERS_MUTATION_NAME, data))
      .catch((e) => console.error(e));
  },
  [GET_USERS_BY_IDS_ACTION_NAME]({ commit, rootState }, payload: string[]) {
    if (!payload.length) return;

    return axios
      .get(`/users?ids=${payload.join(',')}`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data } }) => commit(SET_USERS_MUTATION_NAME, data))
      .catch((e) => console.error(e));
  },
};
