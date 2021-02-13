import { useLazyQuery, useQuery } from '@apollo/client';
import React from 'react';
import {
  GET_CURRENT_CHAT,
  GET_MESSAGES,
  MESSAGE_CREATED_SUBS,
} from './chat-messages.graphql';

export interface Message {
  id: string;
  text: string;
  time: Date;
  user: {
    id: string;
    name: string;
    avatarURL: string;
  };
}

export interface MessageLoaderProps {
  children: (data: {
    messages: Message[];
    me: { id: string; name: string };
  }) => JSX.Element;
  loading: () => JSX.Element;
  update?: () => void;
}

export const MessageLoader: React.FC<MessageLoaderProps> = (
  props: MessageLoaderProps
) => {
  const { children, loading, update = () => {} } = props;

  const getCurrentChatQuery = useQuery(GET_CURRENT_CHAT);
  const [getMessangesFunc, getMessangesQuery] = useLazyQuery(GET_MESSAGES, {
    variables: {
      filter: {
        field: {
          name: 'ID',
          op: 'EQUALS',
          val: getCurrentChatQuery.data.localState.currentChat,
        },
      },
      pagination: {
        fields: ['UPDATED_AT'],
      },
      sort: {
        by: 'ASC',
      },
    },
  });

  React.useEffect(() => {
    if (getCurrentChatQuery.data) getMessangesFunc();
  }, [getCurrentChatQuery.data]);

  React.useEffect(() => {
    update();
  });

  if (!getMessangesQuery.data || !getCurrentChatQuery.data) return loading();

  const me = getMessangesQuery.data.me;
  const chats = me.chats.edges;
  const currentChat = chats[0].node;

  getMessangesQuery.subscribeToMore({
    document: MESSAGE_CREATED_SUBS,
    variables: {
      chatId: currentChat.id,
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const newMessage = { node: subscriptionData.data.MESSAGE_CREATED_EVENT };

      const chat = prev.me.chats.edges.find(
        ({ node }) => node.id === currentChat.id
      ).node;

      if (
        chat.messages.edges.find(({ node }) => node.id === newMessage.node.id)
      )
        return prev;

      return Object.assign({}, prev, {
        me: {
          ...prev.me,
          chats: {
            ...prev.me.chats,
            edges: [
              ...prev.me.chats.edges.filter(
                ({ node }) => node.id !== currentChat.id
              ),
              {
                node: {
                  ...chat,
                  messages: {
                    ...chat.messages,
                    edges: [...chat.messages.edges, newMessage],
                  },
                },
              },
            ],
          },
        },
      });
    },
  });

  const messages: Message[] = currentChat.messages.edges.map(({ node }) => ({
    id: node.id,
    text: node.text,
    time: new Date(node.createdAt),
    user: {
      id: node.member.user.id,
      name: node.member.user.name,
      avatarURL: node.member.user.avatarURL,
    },
  }));

  return children({ messages: messages, me: { id: me.id, name: me.name } });
};

export default MessageLoader;
