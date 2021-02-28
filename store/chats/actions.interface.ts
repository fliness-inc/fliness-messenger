import { State, Actions } from './types';
import { Context } from '~/store/context.interface';
import { State as RootState } from '~/store/state.interface';

export interface IActions<S = State, RS = RootState> {
  [Actions.Types.CREATE_CHAT](ctx: Context<S, RS>, payload: any): Promise<void>;

  [Actions.Types.GET_CHATS](
    ctx: Context<S, RS>,
    payload: Actions.GetChatsPayload
  ): Promise<void>;

  [Actions.Types.GET_CHAT_TYPES](ctx: Context<S, RS>): Promise<void>;

  [Actions.Types.SET_CURRENT_CHAT](
    ctx: Context<S, RS>,
    payload: Actions.SetCurrentChatPayload
  ): Promise<void>;
}

export default IActions;
