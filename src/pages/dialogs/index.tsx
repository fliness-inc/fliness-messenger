import { NextPage } from 'next';
import React from 'react';
import Grid from '@ui/grid/grid';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import ListBar from '@components/list-bar/list-bar';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import ChatBar from '@components/chat-bar/chat-bar';
import ChatMessages from '@components/chat-messages/chat-messages';
import classes from '@pages/dialogs/index.module.scss';
import ChatInput from '@components/chat-input/chat-input';
import SideBar from '@/src/components/side-bar/vertical/side-bar';
import DefaultLayout from '@components/layouts/default/defualt';

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
	
	React.useEffect(() => {
		currentPageVar(PageTypeEnum.DIALOGS);
	}, []);

	return (
		<DefaultLayout 
			username={data.me.name} 
			avatarURL={data.me.avatar} 
			sidebar={<SideBar />}
			listbar={<ListBar title={'Dialogs'}/>}
		>
			<Grid direction='column' className={classes['chat-messages']}>
				<ChatBar title={'Blanka Turaria'} avatarURL={'img/pexels-photo-2613260.jpeg'} />
				<ChatMessages />
				<ChatInput />
			</Grid>
		</DefaultLayout>
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