import { Actions, State } from './types';
import { State as RootState } from '~/store/state.interface';
import { Context } from '~/store/context.interface';

export interface IActions<S = State, RS = RootState> {
  [Actions.Types.GET_USERS](ctx: Context<S, RS>): Promise<any>;

  [Actions.Types.GET_USERS_BY_IDS](
    ctx: Context<S, RS>,
    payload: Actions.SetUsersByIdsPayload,
  ): Promise<any>;
}

export default IActions;
