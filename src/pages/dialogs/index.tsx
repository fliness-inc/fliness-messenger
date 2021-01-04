import { NextPage } from 'next';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import Appbar from '@components/appbar/appbar';
import SideBar from '@components/sidebar/sidebar';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { ChatsLayout } from '@components/layouts/ChatsLayout/ChatsLayout';
import { Pages, currentPage  } from '@store/pages';

export interface Props {
	errorCode?: number;
	data: {
		me: {
			name: string;
			avatar: string;
		}
	}
}

export const DialogsPage: NextPage<Props> = ({ errorCode, data }: Props) => {
	if (errorCode) return <Error statusCode={errorCode}/>;

	currentPage(Pages.DIALOGS);

	return (
		<ChatsLayout data={data}>
			
		</ChatsLayout>
	);
};

DialogsPage.getInitialProps = async ({ apolloClient, req }: any = {}) => {
	try {
		return await apolloClient.query({ query: GET_USER });
	}
	catch(e) {
		return { errorCode: e.graphQLErrors[0].extensions.statusCode || null };
	}
}

export default useApollo(DialogsPage);