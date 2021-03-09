import * as MutationTypes from './mutation-types';
import * as ActionTypes from './action-types';

export const NAMESPACE = 'users';

export const GET_USERS = `${NAMESPACE}/${ActionTypes.GET_USERS}`;
export const GET_USERS_BY_IDS = `${NAMESPACE}/${ActionTypes.GET_USERS_BY_IDS}`;

export default {
  [ActionTypes.GET_USERS]({ commit }) {
    return this.$axios
      .get('/users')
      .then(({ data: { data: users } }) => {
        commit(MutationTypes.SET_USERS, { users });
      })
      .catch((e) => console.error(e));
  },
  [ActionTypes.GET_USERS_BY_IDS](ctx, { ids }) {
    const { commit, rootState } = ctx;
    return this.$axios
      .get(`/users?ids=${ids.join(',')}`, {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then((res) => {
        const {
          data: { data: users },
        } = res;
        commit(MutationTypes.SET_USERS, { users });
      })
      .catch((e) => console.error(e));
  },
};
