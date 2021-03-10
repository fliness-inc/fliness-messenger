import * as NetworkStatus from '../network-status';
import * as MutationTypes from './mutation-types';
import * as ActionTypes from './action-types';

export const NAMESPACE = 'auth';
export const SIGN_IN = `${NAMESPACE}/${ActionTypes.SIGN_IN}`;
export const SIGN_UP = `${NAMESPACE}/${ActionTypes.SIGN_UP}`;
export const SET_TOKENS = `${NAMESPACE}/${ActionTypes.SET_TOKENS}`;
export const SET_ERROR = `${NAMESPACE}/${ActionTypes.SET_ERROR}`;

export default {
  [ActionTypes.SIGN_IN]({ commit }, payload) {
    commit(MutationTypes.SET_STATUS, { status: NetworkStatus.LOADING });
    return this.$axios
      .post('/auth/sign-in', payload)
      .then(({ data: { data: tokens } }) => {
        commit(MutationTypes.SET_TOKENS, { tokens });
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.SUCCESS });
        commit(MutationTypes.SET_ERROR, null);
      })
      .catch((e) => {
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.ERROR });
        commit(MutationTypes.SET_ERROR, e.response.data);
      });
  },
  [ActionTypes.SIGN_UP]({ commit }, payload) {
    commit(MutationTypes.SET_STATUS, { status: NetworkStatus.LOADING });
    return this.$axios
      .post('/auth/sign-up', payload)
      .then(({ data: { data: tokens } }) => {
        commit(MutationTypes.SET_TOKENS, { tokens });
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.SUCCESS });
        commit(MutationTypes.SET_ERROR, null);
      })
      .catch((e) => {
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.ERROR });
        commit(MutationTypes.SET_ERROR, e.response.data);
      });
  },
  [ActionTypes.SET_TOKENS]({ commit }, payload) {
    commit(MutationTypes.SET_TOKENS, payload);
  },
  [ActionTypes.SET_ERROR]({ commit }, payload) {
    commit(MutationTypes.SET_ERROR, payload);
  },
};
