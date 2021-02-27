import {
  SET_TOKENS_ACTION_NAME,
  SIGN_IN_ACTION_NAME,
  SIGN_UP_ACTION_NAME,
  SET_TOKENS_MUTATION_NAME,
} from './types';
import axios from '~/plugins/axios';

export default {
  [SIGN_IN_ACTION_NAME]({ commit }, payload) {
    return axios
      .post('/auth/sign-in', payload)
      .then(({ data: { data } }) => commit(SET_TOKENS_MUTATION_NAME, data))
      .catch((e) => {
        throw e.response.data;
      });
  },
  [SIGN_UP_ACTION_NAME]({ commit }, payload) {
    return axios
      .post('/auth/sign-up', payload)
      .then(({ data: { data } }) => commit(SET_TOKENS_MUTATION_NAME, data))
      .catch((e) => {
        throw e.response.data;
      });
  },
  [SET_TOKENS_ACTION_NAME]({ commit }, payload) {
    commit(SET_TOKENS_MUTATION_NAME, payload);
  },
};
