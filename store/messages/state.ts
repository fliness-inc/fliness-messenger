import { Status } from '../utils';
import { State, SocketConnectionStateEnum } from './types';

export default (): State => ({
  all: {},
  status: Status.NONE,
  socketConnectionState: SocketConnectionStateEnum.DISCONNECTED,
});
