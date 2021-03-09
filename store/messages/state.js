import * as NetworkStatus from '../network-status';
import * as InitStatus from '../initialization-status';
import * as SocketConnectionStatus from '../socket-connection-status';

export default () => ({
  all: {},
  networkStatus: NetworkStatus.NONE,
  initStatus: InitStatus.NONE,
  socketConnectionState: SocketConnectionStatus.DISCONNECTED,
});
