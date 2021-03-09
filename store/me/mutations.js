import * as MutationTypes from './mutation-types';

export default {
  [MutationTypes.SET_ME_INFO](state, payload) {
    state.id = payload.id;
  },
  [MutationTypes.SET_STATUS](state, payload) {
    state.status = payload.status;
  },
};
