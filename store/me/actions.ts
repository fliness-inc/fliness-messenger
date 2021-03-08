import { ActionTypes, MutationTypes } from './types';
import { Actions } from './actions.interface';
import * as UsersState from '~/store/users';
import axios from '~/plugins/axios';

export const actions: Actions = {
  async [ActionTypes.GET_ME_INFO](ctx) {
    const { commit, rootState, dispatch } = ctx;

    const res = await axios.get('/me', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data: me } = res.data;

    await dispatch(
      UsersState.Actions.GET_USERS_BY_IDS,
      { ids: [me.id] },
      { root: true },
    );

    commit(MutationTypes.SET_ME_INFO, { id: me.id });
  },
};

export default actions;
