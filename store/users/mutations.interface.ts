import { Mutations, State } from './types';

export interface IMutations<S = State> {
  [Mutations.Types.SET_USERS](
    state: S,
    payload: Mutations.SetUsersPayload,
  ): void;
}

export default IMutations;
