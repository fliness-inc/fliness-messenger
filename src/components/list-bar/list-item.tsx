import React from 'react';
import { Grid } from '@ui/ui';
import { AvatarIcon } from './avatar-icon';
import { currentChatVar } from '@store/chats';
import classes from '@components/list-bar/list-bar.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useLazyQuery, useSubscription } from '@apollo/client';
import { MESSAGE_CREATED_SUBS, GET_NUM_NOT_VIEWED } from './list-bar.graphql';
import { formatDate } from '@lib/format-date';

export interface ListItemProps {
  id: string;
  title: string;
  desc: string;
  time: Date;
  messages: number;
  avatarURL: string;
  active: boolean;
  userId: string;
  currentUserId: string;
}

export const ListItem: React.FC<ListItemProps> = (props: ListItemProps) => {
  const {
    id,
    title,
    desc,
    time,
    avatarURL,
    active,
    userId,
    currentUserId,
  } = props;

  const router = useRouter();
  const [getNum, { data }] = useLazyQuery(GET_NUM_NOT_VIEWED, {
    nextFetchPolicy: 'network-only',
    variables: {
      filter: {
        field: {
          name: 'ID',
          op: 'EQUALS',
          val: id,
        },
      },
    },
  });
  const { data: newMessage } = useSubscription(MESSAGE_CREATED_SUBS, {
    fetchPolicy: 'network-only',
    onSubscriptionData: () => {
      console.log('new message');
      getNum();
    },
    variables: {
      chatId: id,
    },
  });

  React.useEffect(() => console.log(data?.me.chats.edges[0].node.numUnreaded), [
    data,
    newMessage,
  ]);

  let textLastMessage = newMessage
    ? newMessage.MESSAGE_CREATED_EVENT.text
    : desc;

  textLastMessage =
    userId === currentUserId && textLastMessage.length
      ? `You: ${textLastMessage}`
      : textLastMessage;

  const timeLastMessage = newMessage
    ? new Date(newMessage.MESSAGE_CREATED_EVENT.createdAt)
    : new Date(time);

  const timeElement = timeLastMessage ? (
    <p className={classes['list-item__time']}>
      {Number.isNaN(timeLastMessage.getTime())
        ? ''
        : formatDate(timeLastMessage)}
    </p>
  ) : null;

  const messageElement = data?.me.chats.edges[0].node.numUnreaded ? (
    <p className={classes['list-item__nums']}>
      <span>{data?.me.chats.edges[0].node.numUnreaded}</span>
    </p>
  ) : (
    <p
      className={classNames(
        classes['list-item__nums'],
        classes['list-item__nums-plug']
      )}
    ></p>
  );

  const descElement =
    textLastMessage && textLastMessage.length ? (
      <p className={classes['list-item__desc']}>{textLastMessage}</p>
    ) : null;

  return (
    <Grid
      alignItems="center"
      direction="row"
      wrap="nowrap"
      justify="space-between"
      className={classNames(classes['list-item'], {
        [classes['list-item_active']]: active,
      })}
      onClick={() => {
        currentChatVar(id);
        router.push(`/dialogs/${id}`);
      }}
    >
      <Grid
        alignItems="center"
        justify="space-between"
        className={classes['list-item__header']}
      >
        <div className={classes['list-item__avatar']}>
          <AvatarIcon username={title} url={avatarURL}></AvatarIcon>
          <span className={classes['list-item__status']}>
            <span className={classes['list-item__online-status']}></span>
          </span>
        </div>
        <Grid
          direction="column"
          className={classes['list-item__text']}
          justify={desc && desc.length ? 'space-between' : 'center'}
        >
          <p className={classes['list-item__title']}>{title}</p>
          {descElement}
        </Grid>
      </Grid>
      <Grid
        direction="column"
        className={classes['list-item__info']}
        justify={'space-between'}
      >
        {messageElement}
        {timeElement}
      </Grid>
    </Grid>
  );
};

export default ListItem;
