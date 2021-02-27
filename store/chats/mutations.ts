import {
  CREATE_CHAT_MUTATION_NAME,
  GET_CHATS_MUTATION_NAME,
  SET_CHAT_TYPES_MUTATION_NAME,
} from './types';
import { State, Chat, ChatType } from './state';

export enum ChatTypesEnum {
  DIALOG = 'DIALOG',
  GROUP = 'GROUP',
  CHANNEL = 'CHANNEL',
}

export interface ChatCreatePayload {
  type: ChatTypesEnum;
  userIds: string[];
}

export default {
  [GET_CHATS_MUTATION_NAME](state: State, payload: Chat[]) {
    state.all = payload;
  },
  [CREATE_CHAT_MUTATION_NAME](state: State, payload: Chat) {
    state.all = [...state.all, payload];
  },
  [SET_CHAT_TYPES_MUTATION_NAME](state: State, payload: ChatType[]) {
    state.all = state.all.map((chat) => ({
      ...chat,
      type: payload.find((type) => type.id === chat.typeId),
    }));
  },
};
