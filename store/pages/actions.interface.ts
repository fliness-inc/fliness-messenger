import { State, ActionTypes, SetPageActionPayload } from './types';
import { Context } from '~/store/context.interface';
import { State as RootState } from '~/store/state.interface';

export interface Actions<S = State, RS = RootState> {
  [ActionTypes.SET_PAGE](
    ctx: Context<S, RS>,
    payload: SetPageActionPayload
  ): Promise<void>;
}

export default Actions;
