import * as ActionsTypes from './action-types';
import * as MutationsTypes from './mutation-types';
import * as MenuStates from './menu-states';
import * as MenuInfoStates from './menu-info-state';

export const NAMESPACE = 'flex';

export const CHANGE_MENU_STATE = `${NAMESPACE}/${ActionsTypes.CHANGE_MENU_STATE}`;
export const SET_MENU_STATE = `${NAMESPACE}/${ActionsTypes.SET_MENU_STATE}`;
export const CHANGE_MENU_INFO_STATE = `${NAMESPACE}/${ActionsTypes.CHANGE_MENU_INFO_STATE}`;
export const SET_MENU_INFO_STATE = `${NAMESPACE}/${ActionsTypes.SET_MENU_INFO_STATE}`;

export default {
  [ActionsTypes.SET_MENU_STATE]({ commit }, payload) {
    commit(MutationsTypes.SET_MENU_STATE, payload);
  },
  [ActionsTypes.CHANGE_MENU_STATE]({ commit, state }) {
    if (state.menuState === MenuStates.NONE)
      commit(MutationsTypes.SET_MENU_STATE, {
        state: MenuStates.ACTIVE,
      });
    else
      commit(MutationsTypes.SET_MENU_STATE, {
        state: MenuStates.NONE,
      });
  },
  [ActionsTypes.SET_MENU_INFO_STATE]({ commit }, payload) {
    commit(MutationsTypes.SET_MENU_INFO_STATE, payload);
  },
  [ActionsTypes.CHANGE_MENU_INFO_STATE]({ commit, state }) {
    if (state.menuInfoState === MenuInfoStates.NONE)
      commit(MutationsTypes.SET_MENU_INFO_STATE, {
        state: MenuInfoStates.ACTIVE,
      });
    else
      commit(MutationsTypes.SET_MENU_INFO_STATE, {
        state: MenuInfoStates.NONE,
      });
  },
};
