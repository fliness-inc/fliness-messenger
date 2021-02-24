import { List as UIList } from '@ui/ui';
import React from 'react';
import classes from '@components/list-bar/list-bar.module.scss';
import { LBSkeleton } from './skeleton';
import { useQuery } from '@apollo/client';
import {
  GET_DIALOGS,
  SUBS_CHAT_ADDED,
  GET_LOCAL_STATE,
} from './list-bar.graphql';
import { ListItem } from './list-item';

export const List: React.FC = props => {
  const {} = props;

  const {
    data: {
      localState: { currentChat },
    },
  } = useQuery(GET_LOCAL_STATE);
  const { subscribeToMore, error, data, loading } = useQuery(GET_DIALOGS, {
    variables: {
      filter: {
        field: {
          name: 'TYPE_NAME',
          op: 'EQUALS',
          val: 'DIALOG',
        },
      },
      pagination: {
        last: 1,
        fields: ['UPDATED_AT'],
      },
    },
  });

  if (loading || error) return <LBSkeleton />;

  /* if (newMessage) console.log(newMessage); */

  subscribeToMore({
    document: SUBS_CHAT_ADDED,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newChat = { node: subscriptionData.data.CHAT_CREATED_EVENT };

      if (prev.me.chats.edges.find(({ node }) => node.id === newChat.node.id))
        return prev;

      return Object.assign({}, prev, {
        me: {
          ...prev.me,
          chats: {
            ...prev.me.chats,
            edges: [...prev.me.chats.edges, newChat],
          },
        },
      });
    },
  });

  const {
    me: {
      id: userId,
      chats: { edges: chats },
    },
  } = data;

  const items = chats.map(chat => {
    const {
      node: {
        id,
        numUnreaded,
        members: { edges: members },
        messages: { edges: messages },
      },
    } = chat;

    const {
      node: { user: companion },
    } = members.find(({ node: { user } }) => user.id !== userId);

    const desc = messages.length ? messages[0].node.text : '';
    const time = messages.length ? messages[0].node.createdAt : '';

    return {
      id,
      title: companion.name,
      desc,
      time,
      messages: numUnreaded,
      avatarURL: companion.avatarURL,
      active: currentChat === id,
      userId: messages.length ? messages[0].node.member.user.id : '',
    };
  });

  return (
    <UIList items={items} className={classes['list']}>
      {props => <ListItem key={props.id} {...props} currentUserId={userId} />}
    </UIList>
  );
};

export default List;
