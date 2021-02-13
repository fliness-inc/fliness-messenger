import React from 'react';
import classes from './chat-messages.module.scss';
import { Grid, List } from '@ui/ui';
import classNames from 'classnames';
import EditButton from './edit-button/edit-button';
import CheckIcon from '@public/check.svg';
import ChecksIcon from '@public/combined_shape.svg';
import { MessageLoader, Message } from './message-loader';
import { ChatMessagesSkeletonList } from './list-skeleton';
import { AvatarIcon } from './avatar-icon';

export interface ChatMessagesListProps {}

export const ChatMessagesList: React.FC<ChatMessagesListProps> = (
  props: ChatMessagesListProps
) => {
  const [ref, setRef] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref) return;
    ref.scrollTop = ref.scrollHeight;
  }, [ref]);

  return (
    <MessageLoader
      loading={() => <ChatMessagesSkeletonList />}
      update={() => {
        if (!ref) return;
        ref.scrollTop = ref.scrollHeight;
      }}
    >
      {({ messages, me }) => (
        <List
          ref={e => setRef(e)}
          items={messages}
          className={classes['chat-messages']}
        >
          {(item: Message) => {
            const { id, text, time, user } = item;
            const shift = me.id === user.id;
            return (
              <Grid key={id} direction="column" className={classes['message']}>
                <Grid
                  alignItems="center"
                  direction={shift ? 'row-reverse' : 'row'}
                >
                  <AvatarIcon username={user.name} url={user.avatarURL} />
                  <p className={classes['avatar__name']}>{user.name}</p>
                  <EditButton />
                </Grid>
                <Grid
                  justify="center"
                  direction="column"
                  alignItems={shift ? 'flex-end' : 'flex-start'}
                >
                  <Grid
                    alignItems="center"
                    direction={shift ? 'row-reverse' : 'row'}
                    className={classNames(
                      classes['message__text'],
                      shift ? classes['message__primary-text'] : ''
                    )}
                  >
                    <p>{text}</p>
                  </Grid>
                </Grid>
                <Grid
                  justify="center"
                  direction="column"
                  alignItems={shift ? 'flex-end' : 'flex-start'}
                >
                  <Grid
                    alignItems="center"
                    direction={shift ? 'row-reverse' : 'row'}
                  >
                    <span className={classes['message__time']}>
                      {`${time.getHours()}:${time.getMinutes()} ${
                        time.getHours() >= 12 ? 'PM' : 'AM'
                      }`}
                    </span>
                    <Grid
                      alignItems="center"
                      className={classes['message__loading']}
                    >
                      {!shift ? null : (
                        /*<CheckIcon className={classes['message__loading_process']} />*/
                        <ChecksIcon
                          className={classes['message__loading_done']}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          }}
        </List>
      )}
    </MessageLoader>
  );
};

export default ChatMessagesList;
