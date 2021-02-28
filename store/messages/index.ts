import state from './state';
import { actions } from './actions';
import { mutations } from './mutations';

export * from './types';

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
