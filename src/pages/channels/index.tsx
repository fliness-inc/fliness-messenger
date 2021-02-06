import React from 'react';
import { NextPage } from 'next';
import Error from 'next/error';
import useApollo from '@lib/use-apollo';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import SideBar from '@components/side-bar/vertical/side-bar';
import DefaultLayout from '@components/layouts/default/defualt';
import ListBar from '@components/list-bar/list-bar';
import Request from '@lib/request';

export interface Props {
  statusCode?: number;
  data?: any;
  error?: Error;
}

export const ChannelsPage: NextPage<Props> = ({
  error,
  statusCode,
  data,
}: Props) => {
  if (error) return <Error statusCode={statusCode} />;

  React.useEffect(() => {
    currentPageVar(PageTypeEnum.CHANNELS);
  }, []);

  return (
    <DefaultLayout
      username={data.me.name}
      avatarURL={data.me.avatar}
      sidebar={<SideBar />}
      listbar={<ListBar title={'Channels'} />}
    ></DefaultLayout>
  );
};

ChannelsPage.getInitialProps = async ({ apolloClient }: any = {}) => {
  const getCurrentChatResponse = await Request.make(apolloClient, {
    query: GET_USER,
  });

  if (getCurrentChatResponse.error) return getCurrentChatResponse;

  return {
    statusCode: 200,
    data: getCurrentChatResponse.data,
  };
};

export default useApollo(ChannelsPage);
