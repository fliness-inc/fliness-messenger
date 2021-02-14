import React from 'react';
import { NextPage } from 'next';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import SideBar from '@components/side-bar/vertical/side-bar';
import DefaultLayout from '@components/layouts/default/defualt';
import ListBar from '@components/list-bar/list-bar';
import Request from '@lib/request';
import Head from 'next/head';

export interface Props {
  errorCode?: number;
  data: any;
}

export const GroupsPage: NextPage<Props> = ({ errorCode, data }) => {
  if (errorCode) return <Error statusCode={errorCode} />;

  React.useEffect(() => {
    currentPageVar(PageTypeEnum.GROUPS);
  }, []);

  return (
    <>
      <Head>
        <title>Fliness Messenger - Groups</title>
      </Head>
      <DefaultLayout
        username={data.me.name}
        avatarURL={data.me.avatar}
        sidebar={<SideBar />}
        listbar={<ListBar title={'Groups'} />}
      ></DefaultLayout>
    </>
  );
};

GroupsPage.getInitialProps = async ({ apolloClient }: any = {}) => {
  const getCurrentChatResponse = await Request.make(apolloClient, {
    query: GET_USER,
  });

  if (getCurrentChatResponse.error) return getCurrentChatResponse;

  return {
    statusCode: 200,
    data: getCurrentChatResponse.data,
  };
};

export default useApollo(GroupsPage);
