import { MutationTypes } from './types';
import { Mutations } from './mutations.interface';

export const mutations: Mutations = {
  [MutationTypes.SET_PAGE](state, payload) {
    state.currentPage = payload.page;
  },
};

export default mutations;
