import { State, ActionTypes } from './types';
import { Context } from '~/store/context.interface';
import { State as RootState } from '~/store/state.interface';

export interface Actions<S = State, RS = RootState> {
  [ActionTypes.GET_ME_INFO](ctx: Context<S, RS>): Promise<void>;
}
