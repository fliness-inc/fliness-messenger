export interface ChatType {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  title: string | null;
  description: string | null;
  updatedAt: string;
  createdAt: string;
  typeId: string;
  type: ChatType | null;
}

export interface State {
  all: Chat[];
  currentChatId: string | null;
}

export enum ChatTypesEnum {
  DIALOG = 'DIALOG',
  GROUP = 'GROUP',
  CHANNEL = 'CHANNEL',
}

export interface GetChatsActionPayload {
  type: ChatTypesEnum;
}

export interface SetCurrentChatMutationPayload {
  chatId: string | null;
}
export interface SetCurrentChatActionPayload
  extends SetCurrentChatMutationPayload {}

export const NAMESPACE = 'chats';

export namespace MutationTypes {
  export const CREATE_CHAT = 'CREATE_CHAT';
  export const GET_CHATS = 'GET_CHATS';
  export const SET_CHAT_TYPES = 'SET_CHAT_TYPES';
  export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
}

export namespace ActionTypes {
  export const CREATE_CHAT = 'CREATE_CHAT';
  export const GET_CHATS = 'GET_CHATS';
  export const GET_CHAT_TYPES = 'GET_CHAT_TYPES';
  export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
}

export namespace Actions {
  export const CREATE_CHAT = `${NAMESPACE}/${ActionTypes.CREATE_CHAT}`;
  export const GET_CHATS = `${NAMESPACE}/${ActionTypes.GET_CHATS}`;
  export const GET_CHAT_TYPES = `${NAMESPACE}/${ActionTypes.GET_CHAT_TYPES}`;
  export const SET_CURRENT_CHAT = `${NAMESPACE}/${ActionTypes.SET_CURRENT_CHAT}`;
}
