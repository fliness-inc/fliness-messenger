import { Actions, Mutations, MenuStateEnum } from './types';

export default {
  [Actions.Types.SET_MENU_STATE]({ commit }, payload) {
    commit(Mutations.Types.SET_MENU_STATE, payload);
  },
  [Actions.Types.CHANGE_MENU_STATE]({ commit, state }) {
    if (state.menuState === MenuStateEnum.NONE)
      commit(Mutations.Types.SET_MENU_STATE, { state: MenuStateEnum.ACTIVE });
    else commit(Mutations.Types.SET_MENU_STATE, { state: MenuStateEnum.NONE });
  },
};
