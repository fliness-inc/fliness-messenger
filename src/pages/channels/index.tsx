import React from 'react';
import { NextPage } from 'next';
import Error from 'next/error';
import useApollo from '@lib/use-apollo';
import { ChatsLayout } from '@components/layouts/chatsLayout/chatsLayout';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { Pages, currentPage  } from '@store/pages';

export interface Props {
    errorCode?: number;
	data: any
}

export const ChannelsPage: NextPage<Props> = ({ errorCode, data }: Props) => {
	if (errorCode) return <Error statusCode={errorCode}/>;

	currentPage(Pages.CHANNELS);

	return (
		<ChatsLayout data={data}>
			
		</ChatsLayout>
	);
};

ChannelsPage.getInitialProps = async ({ apolloClient, req }: any = {}) => {
	try {
		return await apolloClient.query({ query: GET_USER });
	}
	catch(e) {
		return { errorCode: e.graphQLErrors[0].extensions.statusCode || null };
	}
}

export default useApollo(ChannelsPage);