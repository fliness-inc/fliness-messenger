import { State, MutationTypes, SetMeInfoMutationPayload } from './types';

export interface Mutations<S = State> {
  [MutationTypes.SET_ME_INFO](
    state: S,
    payload: SetMeInfoMutationPayload
  ): void;
}
