import { State } from './types';
import { Status } from '~/store/utils';

export default (): State => ({
  all: [],
  status: Status.NONE,
  currentChatId: null,
});
