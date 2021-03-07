import { Status } from '../utils';
import { State, Mutations } from './types';

export interface IMutations<S = State> {
  [Mutations.Types.SET_MESSAGES](
    state: S,
    payload: Mutations.SetMessagesPayload,
  ): void;
  [Mutations.Types.SET_MESSAGES_STATUS](
    state: S,
    payload: { status: Status },
  ): void;

  [Mutations.Types.SET_SOCKET_CONNECTION_STATE](
    state: S,
    payload: Mutations.SetSocketConnectionStatePayload,
  ): void;

  [Mutations.Types.ADD_NEW_MESSAGE](
    state: S,
    payload: Mutations.AddNewMessagePayload,
  ): void;
}

export default IMutations;
