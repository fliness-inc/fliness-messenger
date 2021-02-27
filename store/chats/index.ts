import state from './state';
import { mutations } from './mutations';
import { actions } from './actions';

export * from './types';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
