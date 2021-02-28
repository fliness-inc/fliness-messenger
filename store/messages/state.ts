import { State, SocketConnectionStateEnum } from './types';

export default (): State => ({
  messagesCurrentChat: [],
  socketConnectionState: SocketConnectionStateEnum.DISCONNECTED,
});
