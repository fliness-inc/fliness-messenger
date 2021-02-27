import { State, MutationTypes, SetCurrentChatMutationPayload } from './types';

export interface Mutations<S = State> {
  [MutationTypes.CREATE_CHAT](state: S, payload: any): void;
  [MutationTypes.GET_CHATS](state: S, payload: any): void;
  [MutationTypes.SET_CHAT_TYPES](state: S, payload: any): void;
  [MutationTypes.SET_CURRENT_CHAT](
    state: S,
    payload: SetCurrentChatMutationPayload
  ): void;
}
