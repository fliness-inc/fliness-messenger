import { Message } from '~/store/messages/types';

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
  lastMessage: Message | null;
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

export const NAMESPACE = 'chats';

export namespace Mutations {
  export namespace Types {
    export const CREATE_CHAT = 'CREATE_CHAT';
    export const GET_CHATS = 'GET_CHATS';
    export const SET_CHAT_TYPES = 'SET_CHAT_TYPES';
    export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
    export const SET_LAST_MESSAGES = 'SET_LAST_MESSAGES';
  }

  export interface SetCurrentChatPayload {
    chatId: string | null;
  }

  export interface SetLastMessagesPayload {
    messages: Messages;
  }
}

export namespace Actions {
  export namespace Types {
    export const CREATE_CHAT = 'CREATE_CHAT';
    export const GET_CHATS = 'GET_CHATS';
    export const GET_CHAT_TYPES = 'GET_CHAT_TYPES';
    export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
    export const SET_LAST_MESSAGES = 'SET_LAST_MESSAGES';
  }

  export interface GetChatsPayload {
    type: ChatTypesEnum;
  }

  export interface SetCurrentChatPayload
    extends Mutations.SetCurrentChatPayload {}

  export const CREATE_CHAT = `${NAMESPACE}/${Types.CREATE_CHAT}`;
  export const GET_CHATS = `${NAMESPACE}/${Types.GET_CHATS}`;
  export const GET_CHAT_TYPES = `${NAMESPACE}/${Types.GET_CHAT_TYPES}`;
  export const SET_CURRENT_CHAT = `${NAMESPACE}/${Types.SET_CURRENT_CHAT}`;
  export const SET_LAST_MESSAGES = `${NAMESPACE}/${Types.SET_LAST_MESSAGES}`;
}
