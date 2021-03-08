import { Actions, Mutations } from './types';
import { IActions } from './actions.interface';
import axios from '~/plugins/axios';

export const actions: IActions = {
  [Actions.Types.GET_USERS](ctx) {
    const { commit } = ctx;
    return axios
      .get('/users')
      .then((res) => {
        const {
          data: { data: users },
        } = res;
        commit(Mutations.Types.SET_USERS, { users });
      })
      .catch((e) => console.error(e));
  },
  [Actions.Types.GET_USERS_BY_IDS](ctx, payload) {
    const { commit, rootState } = ctx;
    return axios
      .get(`/users?ids=${payload.ids.join(',')}`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then((res) => {
        const {
          data: { data: users },
        } = res;
        commit(Mutations.Types.SET_USERS, { users });
      })
      .catch((e) => console.error(e));
  },
};

export default actions;
