import React from 'react';
import { ChatMessagesSkeletonList } from './list-skeleton';
import dynamic from 'next/dynamic';

const DynamicList = dynamic(() => import('./list'), {
  ssr: false,
  loading: () => <ChatMessagesSkeletonList />,
});

export interface ItemType {
  id: string;
  username: string;
  avatarURL: string;
  message: string;
  time: string;
}

export interface ChatMessagesProps {}

export const ChatMessages: React.FC<ChatMessagesProps> = () => {
  return <DynamicList />;
};

export default ChatMessages;
