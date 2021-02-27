import {
  State,
  ActionTypes,
  SetCurrentChatActionPayload,
  GetChatsActionPayload,
} from './types';
import { Context } from '~/store/context.interface';
import { State as RootState } from '~/store/state.interface';

export interface IActions<S = State, RS = RootState> {
  [ActionTypes.CREATE_CHAT](ctx: Context<S, RS>, payload: any): Promise<void>;

  [ActionTypes.GET_CHATS](
    ctx: Context<S, RS>,
    payload: GetChatsActionPayload
  ): Promise<void>;

  [ActionTypes.GET_CHAT_TYPES](ctx: Context<S, RS>): Promise<void>;

  [ActionTypes.SET_CURRENT_CHAT](
    ctx: Context<S, RS>,
    payload: SetCurrentChatActionPayload
  ): Promise<void>;
}
