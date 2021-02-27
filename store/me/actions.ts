import { ActionTypes, MutationTypes, SetMeInfoMutationPayload } from './types';
import { Actions } from './actions.interface';
import axios from '~/plugins/axios';

export const actions: Actions = {
  async [ActionTypes.GET_ME_INFO](ctx) {
    const { commit, rootState } = ctx;

    const res = await axios.get('/me', {
      headers: {
        Authorization: `Bearer ${rootState.auth.tokens.access}`,
      },
    });

    const { data } = res.data;
    const payload: SetMeInfoMutationPayload = {
      id: data.id,
      name: data.name,
      email: data.email,
      avatarURL: data.avatarURL,
    };

    commit(MutationTypes.SET_ME_INFO, payload);
  },
};

export default actions;
