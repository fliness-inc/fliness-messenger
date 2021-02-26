import { CREATE_CHAT_MUTATION_NAME, GET_CHATS_MUTATION_NAME } from './types';

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
    console.log(payload);
  },
  [CREATE_CHAT_MUTATION_NAME](state, payload) {
    state = [...state, payload];
  },
};
