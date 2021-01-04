import React from 'react';
import { NextPage } from 'next';
import useApollo from '@lib/use-apollo';
import { ChatsLayout } from '@components/layouts/ChatsLayout/ChatsLayout';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { Pages, currentPage  } from '@store/pages';

export interface Props {
    errorCode?: number;
	data: any
}

export const GroupsPage: NextPage<Props> = ({  errorCode, data }) => {
    if (errorCode) return <Error statusCode={errorCode}/>;

	currentPage(Pages.GROUPS);

	return (
		<ChatsLayout data={data}>
			
		</ChatsLayout>
	);
};

GroupsPage.getInitialProps = async ({ apolloClient, req }: any = {}) => {
	try {
		return await apolloClient.query({ query: GET_USER });
	}
	catch(e) {
		return { errorCode: e.graphQLErrors[0].extensions.statusCode || null };
	}
}

export default useApollo(GroupsPage);