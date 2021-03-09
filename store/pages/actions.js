import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';

export const NAMESPACE = 'pages';

export const SET_PAGE = `${NAMESPACE}/${ActionTypes.SET_PAGE}`;

export default {
  [ActionTypes.SET_PAGE]({ commit }, payload) {
    commit(MutationTypes.SET_PAGE, payload);
  },
};
