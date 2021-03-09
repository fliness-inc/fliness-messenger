import * as NetworkStatus from '../network-status';
import * as ActionTypes from './action-types';
import * as MutationTypes from './mutation-types';
import * as MembersActions from '~/store/members/actions';
import * as UsersActions from '~/store/users/actions';
import * as MessagesActions from '~/store/messages/actions';

export const NAMESPACE = 'chats';

export const CREATE_CHAT = `${NAMESPACE}/${ActionTypes.CREATE_CHAT}`;
export const GET_CHATS = `${NAMESPACE}/${ActionTypes.GET_CHATS}`;
export const GET_CHAT_TYPES = `${NAMESPACE}/${ActionTypes.GET_CHAT_TYPES}`;
export const SET_CURRENT_CHAT = `${NAMESPACE}/${ActionTypes.SET_CURRENT_CHAT}`;
export const GET_CHATS_LAST_MESSAGES = `${NAMESPACE}/${ActionTypes.GET_CHATS_LAST_MESSAGES}`;
export const SET_INIT_STATUS = `${NAMESPACE}/${ActionTypes.SET_INIT_STATUS}`;

export default {
  [ActionTypes.GET_CHATS]({ commit, rootState, dispatch }) {
    commit(MutationTypes.SET_CHATS_STATUS, { status: NetworkStatus.LOADING });
    return this.$axios
      .get('/me/chats')
      .then(({ data: { data: chats } }) => chats)
      .then(async (chats) => {
        await dispatch(
          MembersActions.GET_CHATS_MEMBERS,
          { ids: chats.map((chat) => chat.id) },
          { root: true },
        );
        return chats;
      })
      .then(async (chats) => {
        const companions = rootState.members.all.filter(
          (member) => member.userId !== rootState.me.id,
        );

        await dispatch(
          UsersActions.GET_USERS_BY_IDS,
          { ids: companions.map((member) => member.userId) },
          { root: true },
        );

        return chats;
      })
      .then(async (chats) => {
        for (const chat of chats) {
          await dispatch(
            MessagesActions.SET_MESSAGES,
            {
              chatId: chat.id,
              messages: chat.messages,
            },
            {
              root: true,
            },
          );
        }
        return chats;
      })
      .then((chats) => {
        commit(MutationTypes.SET_CHATS, { chats });
        commit(MutationTypes.SET_CHATS_STATUS, {
          status: NetworkStatus.SUCCESS,
        });
      })
      .catch(() =>
        commit(MutationTypes.SET_CHATS_STATUS, { status: NetworkStatus.ERROR }),
      );
  },
  async [ActionTypes.CREATE_CHAT]({ commit, rootState, dispatch }, payload) {
    const {
      data: { data: createdChat },
    } = await this.$axios.post('/chats', payload);

    await dispatch(GET_CHAT_TYPES, null, { root: true });

    await dispatch(
      MembersActions.GET_CHATS_MEMBERS,
      {
        ids: [createdChat.id],
      },
      { root: true },
    );

    const companions = rootState.members.all.filter(
      (member) =>
        member.chatId === createdChat.id && member.userId !== rootState.me.id,
    );

    await dispatch(
      UsersActions.GET_USERS_BY_IDS,
      { ids: companions.map((member) => member.userId) },
      { root: true },
    );

    commit(MutationTypes.CREATE_CHAT, { chat: createdChat });
  },
  async [ActionTypes.GET_CHAT_TYPES]({ commit }) {
    const {
      data: { data: chatTypes },
    } = await this.$axios.get('/chats/types');

    commit(MutationTypes.SET_CHAT_TYPES, { types: chatTypes });
  },
  [ActionTypes.SET_CURRENT_CHAT]({ commit }, payload) {
    commit(MutationTypes.SET_CURRENT_CHAT, payload);
  },
  [ActionTypes.SET_INIT_STATUS]({ commit }, payload) {
    commit(MutationTypes.SET_INIT_STATUS, payload);
  },
};
