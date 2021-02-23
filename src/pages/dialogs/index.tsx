import { NextPage } from 'next';
import React from 'react';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import ListBar from '@components/list-bar/list-bar';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import SideBar from '@components/side-bar/vertical/side-bar';
import Grid from '@ui/grid/grid';
import DefaultLayout from '@components/layouts/default/defualt';
import classes from '@pages/dialogs/index.module.scss';
import classNames from 'classnames';
import DialogsIcon from '@public/chat_bubble_outline.svg';
import { currentChatVar } from '@store/chats';
import Request, { RequestResponse } from '@lib/request';
import Head from 'next/head';
import InfoBar from '@/src/components/info-bar/info-bar';

export interface Data {
  me: {
    name: string;
    avatarURL: string;
  };
}

export const DialogsPage: NextPage<RequestResponse<Data>> = ({
  error,
  statusCode,
  data,
}: RequestResponse<Data>) => {
  if (error) return <Error statusCode={statusCode} />;

  React.useEffect(() => {
    currentPageVar(PageTypeEnum.DIALOGS);
    currentChatVar(null);
  }, []);

  const {
    me: { name, avatarURL },
  } = data;

  return (
    <>
      <Head>
        <title>Fliness Messenger - Dialogs</title>
      </Head>
      <DefaultLayout
        username={name}
        avatarURL={avatarURL}
        sidebar={<SideBar />}
        listbar={<ListBar title={'Dialogs'} />}
      >
        <Grid
          direction="column"
          alignItems="center"
          justify="center"
          className={classNames(
            classes['chat-messages'],
            classes['chat-messages__plug']
          )}
        >
          <Grid
            direction="column"
            alignItems="center"
            className={classes['plug']}
          >
            <DialogsIcon className={classes['plug__icon']} />
            <p className={classes['plug__title']}>Please select a dialog</p>
            <p className={classes['plug__desc']}>to start messaging</p>
          </Grid>
        </Grid>
        <InfoBar title={name} avatarURL={avatarURL} />
      </DefaultLayout>
    </>
  );
};

DialogsPage.getInitialProps = async (ctx: any = {}) => {
  const { apolloClient } = ctx;

  const getCurrentChatResponse = await Request.make(apolloClient, {
    query: GET_USER,
  });

  if (getCurrentChatResponse.error) return getCurrentChatResponse;

  return {
    statusCode: 200,
    data: getCurrentChatResponse.data,
  };
};

export default useApollo(DialogsPage);
