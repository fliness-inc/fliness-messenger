import { NextPage } from 'next';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import Appbar from '@components/appbar/appbar';
import SideBar from '@components/sidebar/sidebar';
import { GET_USER } from '@pages/dialogs/index.graphql';

export interface Props {
	errorCode?: number;
	data: {
		me: {
			name: string;
			avatar: string;
		}
	}
}

export const Dialogs: NextPage<Props> = ({ errorCode, data }: Props) => {
	if (errorCode) return <Error statusCode={errorCode}/>;

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Appbar username={data.me.name} avatar={data.me.avatar} />
			<Grid container direction="row" alignItems='center'>
				<SideBar />
			</Grid>
		</Grid>
	);
};

Dialogs.getInitialProps = async ({ apolloClient, req }: any = {}) => {
	try {
		return await apolloClient.query({ query: GET_USER });
	}
	catch(e) {
		return { errorCode: e.graphQLErrors[0].extensions.statusCode || null };
	}
}

export default useApollo(Dialogs);