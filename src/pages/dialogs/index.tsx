import { NextPage } from 'next';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import useApollo from '@src/lib/use-apollo';
import { gql } from '@apollo/client';
import Error from 'next/error';
import { currentPage, Pages } from '@store/pages';
import Appbar from '@components/appbar/appbar';

export interface Props {
	errorCode?: number;
}

export const Dialogs: NextPage<Props> = ({ errorCode }: Props) => {
	currentPage(Pages.DIALOGS);

	if (errorCode) return <Error statusCode={errorCode}/>;

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Appbar/>
			<Grid container direction="row" alignItems='center'></Grid>
		</Grid>
	);
};

Dialogs.getInitialProps = async ({ apolloClient }: any = {}) => {
	return apolloClient.query({
		query: gql`
			query MeQuery {
				me {
					id
				}
			}`
	}).then(() => ({}))
		.catch(e => ({ errorCode: e.graphQLErrors[0].extensions.statusCode || null }));
}

export default useApollo(Dialogs);
