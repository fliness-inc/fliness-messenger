import { State, MutationTypes, SetPageMutationPayload } from './types';

export interface Mutations<S = State> {
  [MutationTypes.SET_PAGE](state: S, payload: SetPageMutationPayload): void;
}

export default Mutations;
