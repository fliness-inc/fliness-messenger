import { State, Actions } from './types';
import { Context } from '~/store/context.interface';
import { State as RootState } from '~/store/state.interface';

export interface IActions<S = State, RS = RootState> {
  [Actions.Types.GET_MESSAGES](
    ctx: Context<S, RS>,
    payload: Actions.GetMessagesPayload
  ): Promise<void>;

  [Actions.Types.CONNECT_SOCKET](ctx: Context<S, RS>): Promise<void>;

  [Actions.Types.DISCONNECT_SOCKET](ctx: Context<S, RS>): Promise<void>;

  [Actions.Types.SEND_MESSAGE](
    ctx: Context<S, RS>,
    payload: Actions.SendMessagePayload
  ): Promise<void>;
}

export default IActions;
