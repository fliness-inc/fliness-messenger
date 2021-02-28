import * as MeTypes from './me/types';
import * as AuthTypes from './auth/types';
import * as ChatsTypes from './chats/types';
import * as FlexTypes from './flex/types';
import * as MembersTypes from './members/types';
import * as MessagesTypes from './messages/types';
import * as PagesTypes from './pages/types';
import * as UsersTypes from './users/types';

export interface State {
  [MeTypes.NAMESPACE]: MeTypes.State;
  [AuthTypes.NAMESPACE]: AuthTypes.State;
  [ChatsTypes.NAMESPACE]: ChatsTypes.State;
  [FlexTypes.NAMESPACE]: FlexTypes.State;
  [MembersTypes.NAMESPACE]: MembersTypes.State;
  [MessagesTypes.NAMESPACE]: MessagesTypes.State;
  [PagesTypes.NAMESPACE]: PagesTypes.State;
  [UsersTypes.NAMESPACE]: UsersTypes.State;
}
