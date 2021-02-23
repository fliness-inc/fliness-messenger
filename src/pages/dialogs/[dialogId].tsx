import { NextPage } from 'next';
import React from 'react';
import Grid from '@ui/grid/grid';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { GET_USER, GET_CURRENT_CHAT } from '@pages/dialogs/index.graphql';
import ListBar from '@components/list-bar/list-bar';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import ChatBar from '@components/chat-bar/chat-bar';
import ChatMessages from '@components/chat-messages/chat-messages';
import classes from '@pages/dialogs/index.module.scss';
import ChatInput from '@components/chat-input/chat-input';
import SideBar from '@components/side-bar/vertical/side-bar';
import DefaultLayout from '@components/layouts/default/defualt';
import { currentChatVar } from '@store/chats';
import Request from '@lib/request';
import Head from 'next/head';
import InfoBar from '@/src/components/info-bar/info-bar';

export interface Props {
  error?: Error;
  data?: any | any[];
  statusCode: number;
}

export const DialogPage: NextPage<Props> = ({
  error,
  data,
  statusCode,
}: Props) => {
  if (error) return <Error statusCode={statusCode} />;

  const { query } = useRouter();

  React.useEffect(() => {
    currentPageVar(PageTypeEnum.DIALOG);
    currentChatVar(
      Array.isArray(query.dialogId) ? query.dialogId[0] : query.dialogId
    );
  }, []);

  const {
    me: { name, avatarURL },
  } = data[0];
  const {
    me: {
      chats: { edges: chats },
    },
  } = data[1];

  if (chats.length !== 1) return <Error statusCode={404} />;

  const {
    node: { user: member },
  } = chats[0].node.members.edges[0];

  return (
    <>
      <Head>
        <title>Fliness Messenger - {member.name}</title>
      </Head>
      <DefaultLayout
        username={name}
        avatarURL={avatarURL}
        sidebar={<SideBar />}
        listbar={<ListBar title={'Dialogs'} />}
      >
        <Grid direction="column" className={classes['chat-messages']}>
          <ChatBar title={member.name} avatarURL={member.avatarURL} />
          <ChatMessages></ChatMessages>
          <ChatInput></ChatInput>
        </Grid>
        <InfoBar title={member.name} avatarURL={member.avatarURL} />
      </DefaultLayout>
    </>
  );
};

DialogPage.getInitialProps = async ({ apolloClient, query }: any = {}) => {
  const getUserResponse = await Request.make(apolloClient, {
    query: GET_USER,
  });

  if (getUserResponse.error) return getUserResponse;

  const getCurrentChatResponse = await Request.make(apolloClient, {
    query: GET_CURRENT_CHAT,
    variables: {
      chatFilter: {
        field: {
          name: 'ID',
          op: 'EQUALS',
          val: query.dialogId,
        },
      },
      memberFilter: {
        field: {
          name: 'USER_ID',
          op: 'NOT_EQUAL',
          val: getUserResponse.data.me.id,
        },
      },
    },
  });

  if (getCurrentChatResponse.error) return getCurrentChatResponse;

  return {
    statusCode: 200,
    data: [getUserResponse.data, getCurrentChatResponse.data],
  };
};

export default useApollo(DialogPage);
