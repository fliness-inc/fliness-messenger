import * as NetworkStatus from '../network-status';
import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';
import * as UsersActions from '~/store/users/actions';

export const NAMESPACE = 'me';

export const GET_ME_INFO = `${NAMESPACE}/${ActionTypes.GET_ME_INFO}`;

export default {
  [ActionTypes.GET_ME_INFO]({ commit, rootState, dispatch }) {
    commit(MutationTypes.SET_STATUS, { status: NetworkStatus.LOADING });
    return this.$axios
      .get('/me', {
        headers: {
          Authorization: `Bearer ${rootState.auth.tokens.access}`,
        },
      })
      .then(({ data: { data: meInfo } }) => {
        commit(MutationTypes.SET_ME_INFO, { id: meInfo.id });
        return dispatch(
          UsersActions.GET_USERS_BY_IDS,
          { ids: [meInfo.id] },
          { root: true },
        );
      })
      .then(() =>
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.SUCCESS }),
      )
      .catch(() =>
        commit(MutationTypes.SET_STATUS, { status: NetworkStatus.ERROR }),
      );
  },
};
