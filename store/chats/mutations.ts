import {
  CREATE_CHAT_MUTATION_NAME,
  GET_CHATS_MUTATION_NAME,
  SET_CHAT_TYPES_MUTATION_NAME,
} from './types';

export interface Chat {
  id: string;
  title: string | null;
  description: string | null;
  updatedAt: Date;
  createdAt: Date;
  typeId: string;
}

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
  [GET_CHATS_MUTATION_NAME](state, payload) {
    state.all = payload;
  },
  [CREATE_CHAT_MUTATION_NAME](state, payload) {
    state.all = [...state.all, payload];
  },
  [SET_CHAT_TYPES_MUTATION_NAME](state, payload) {
    state.all = state.all.map((chat) => ({
      ...chat,
      type: payload.find((type) => type.id === chat.typeId),
    }));
  },
};
