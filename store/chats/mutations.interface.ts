import { State, Mutations } from './types';

export interface IMutations<S = State> {
  [Mutations.Types.SET_CHATS](state: S, payload: any): void;
  [Mutations.Types.SET_CHATS_STATUS](state: S, payload: any): void;

  [Mutations.Types.CREATE_CHAT](state: S, payload: any): void;
  [Mutations.Types.SET_CHAT_TYPES](state: S, payload: any): void;
  [Mutations.Types.SET_CURRENT_CHAT](
    state: S,
    payload: Mutations.SetCurrentChatPayload,
  ): void;
}

export default IMutations;
