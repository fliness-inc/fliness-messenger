import { ActionTypes, MutationTypes } from './types';
import { Actions } from './actions.interface';

export const actions: Actions = {
  async [ActionTypes.SET_PAGE](ctx, payload) {
    const { commit } = ctx;
    await commit(MutationTypes.SET_PAGE, payload);
  },
};

export default actions;
