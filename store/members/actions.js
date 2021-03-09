import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';

export const NAMESPACE = 'members';
export const GET_CHATS_MEMBERS = `${NAMESPACE}/${ActionTypes.GET_CHATS_MEMBERS}`;
export const GET_CHAT_MEMBER = `${NAMESPACE}/${ActionTypes.GET_CHATS_MEMBERS}`;
export const SET_INIT_STATUS = `${NAMESPACE}/${ActionTypes.SET_INIT_STATUS}`;

export default {
  [ActionTypes.GET_CHATS_MEMBERS]({ commit }, { ids }) {
    if (!Array.isArray(ids) || !ids.length) return;

    return this.$axios
      .get(`/chats/members?chatIds=${ids.join(',')}`)
      .then(({ data: { data: members } }) =>
        commit(MutationTypes.SET_CHATS_MEMBERS, { members }),
      )
      .catch((e) => console.error(e));
  },
  [ActionTypes.GET_CHAT_MEMBER]({ commit }, { memberId }) {
    return this.$axios
      .get(`/chats/members/${memberId}`)
      .then(({ data: { data: member } }) =>
        commit(MutationTypes.SET_CHATS_MEMBERS, { members: [member] }),
      )
      .catch((e) => console.error(e));
  },
  [ActionTypes.SET_INIT_STATUS]({ commit }, payload) {
    commit(MutationTypes.SET_INIT_STATUS, payload);
  },
};
