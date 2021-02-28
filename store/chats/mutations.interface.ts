import { State, Mutations } from './types';

export interface IMutations<S = State> {
  [Mutations.Types.CREATE_CHAT](state: S, payload: any): void;
  [Mutations.Types.GET_CHATS](state: S, payload: any): void;
  [Mutations.Types.SET_CHAT_TYPES](state: S, payload: any): void;
  [Mutations.Types.SET_CURRENT_CHAT](
    state: S,
    payload: Mutations.SetCurrentChatPayload
  ): void;
}

export default IMutations;
