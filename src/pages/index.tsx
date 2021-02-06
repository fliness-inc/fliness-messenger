import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useApollo from '@lib/use-apollo';
import { GET_USER } from './index.graphql';
import { Request, RequestResponse } from '@lib/request';
import React from 'react';

export interface Data {
  me: {
    name: string;
    avatarURL: string;
  };
}

export const IndexPage: NextPage<RequestResponse<Data>> = ({
  statusCode,
}: RequestResponse<Data>) => {
  const router = useRouter();

  React.useEffect(() => {
    if (statusCode === 200) router.push('/dialogs');
    else router.push('/signin');
  }, []);

  return <></>;
};

IndexPage.getInitialProps = async ({ apolloClient }: any = {}): Promise<
  RequestResponse<Data>
> => {
  const getCurrentChatResponse = await Request.make(apolloClient, {
    query: GET_USER,
  });

  if (getCurrentChatResponse.error) return getCurrentChatResponse;

  return {
    statusCode: 200,
    data: getCurrentChatResponse.data,
  };
};

export default useApollo(IndexPage);
