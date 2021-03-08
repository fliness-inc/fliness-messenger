import lodash from 'lodash';
import { Mutations } from './types';
import { IMutations } from './mutations.interface';

export const mutations: IMutations = {
  [Mutations.Types.SET_USERS](state, payload) {
    state.all = lodash.unionBy(state.all, payload.users, 'id');
  },
};

export default mutations;
