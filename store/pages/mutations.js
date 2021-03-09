import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_PAGE](state, payload) {
    state.currentPage = payload.page;
  },
};
