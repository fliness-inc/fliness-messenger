import * as NetworkStatus from '../network-status';
import * as InitializationStatus from '~/store/initialization-status';

export default () => ({
  all: {},
  initStatus: InitializationStatus.NONE,
  networkStatus: NetworkStatus.NONE,
  currentChatId: null,
});
