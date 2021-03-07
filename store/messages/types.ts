import { Status } from '../utils';

export interface Message {
  id: string;
  text: string;
  memberId: string;
  updatedAt: string;
  createdAt: string;
}

export enum SocketConnectionStateEnum {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export interface State {
  all: {
    [key: string]: Message[];
  };
  status: Status;
  socketConnectionState: SocketConnectionStateEnum;
}

export const NAMESPACE = `messages`;

export namespace Mutations {
  export namespace Types {
    export const SET_MESSAGES = 'SET_MESSAGES';
    export const SET_MESSAGES_STATUS = 'SET_MESSAGES_STATUS';

    export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
    export const SET_SOCKET_CONNECTION_STATE = 'SET_SOCKET_CONNECTION_STATE';
  }

  export interface SetMessagesPayload {
    chatId: string;
    messages: Message[];
  }

  export interface SetSocketConnectionStatePayload {
    state: SocketConnectionStateEnum;
  }

  export interface AddNewMessagePayload {
    chatId: string;
    message: Message;
  }
}

export namespace Actions {
  export namespace Types {
    export const GET_MESSAGES = 'GET_MESSAGES';
    export const SET_MESSAGES = 'SET_MESSAGES';
    export const CONNECT_SOCKET = 'CONNECT_SOCKET';
    export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
    export const SEND_MESSAGE = 'SEND_MESSAGE';
  }

  export interface GetMessagesPayload {
    chatId: string;
  }

  export interface SendMessagePayload {
    text: string;
  }

  export interface SetMessagesPayload extends Mutations.SetMessagesPayload {}

  export const GET_MESSAGES = `${NAMESPACE}/${Types.GET_MESSAGES}`;
  export const CONNECT_SOCKET = `${NAMESPACE}/${Types.CONNECT_SOCKET}`;
  export const DISCONNECT_SOCKET = `${NAMESPACE}/${Types.DISCONNECT_SOCKET}`;
  export const SEND_MESSAGE = `${NAMESPACE}/${Types.SEND_MESSAGE}`;
  export const SET_MESSAGES = `${NAMESPACE}/${Types.SET_MESSAGES}`;
}
