import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Grid from '@ui/grid/grid';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { ChatsLayout } from '@components/layouts/chatsLayout/chatsLayout';
import { ListBar } from '@components/listbar/listbar';
import { Pages, currentPage  } from '@store/pages';
import ChatBar from '@components/chat-bar/chat-bar';
import ChatMessages from '@components/chat-messages/chat-messages';
import classes from '@pages/dialogs/index.module.scss';
import ChatInput from '@components/chat-input/chat-input';

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

	useEffect(() => {
		currentPage(Pages.DIALOGS);
	}, [])

	return (
		<ChatsLayout data={data}>
			<ListBar title={'Dialogs'}/>
			<Grid direction='column' className={classes['chat-messages']}>
				<ChatBar title={'Blanka Turaria'} avatarURL={'img/pexels-photo-2613260.jpeg'} />
				<ChatMessages />
				<ChatInput />
			</Grid>
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