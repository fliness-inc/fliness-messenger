import React from 'react';
import { NextPage } from 'next';
import useApollo from '@lib/use-apollo';
import Error from 'next/error';
import { GET_USER } from '@pages/dialogs/index.graphql';
import { PageTypeEnum, currentPageVar } from '@store/pages';
import SideBar from '@/src/components/side-bar/vertical/side-bar';
import DefaultLayout from '@components/layouts/default/defualt';
import ListBar from '@components/list-bar/list-bar';

export interface Props {
    errorCode?: number;
	data: any
}

export const GroupsPage: NextPage<Props> = ({  errorCode, data }) => {
    if (errorCode) return <Error statusCode={errorCode}/>;
	
	React.useEffect(() => {
		currentPageVar(PageTypeEnum.GROUPS);
	}, []);

	return (
		<DefaultLayout 
			username={data.me.name} 
			avatarURL={data.me.avatar}
			sidebar={<SideBar />}
			listbar={<ListBar title={'Groups'} />}
		>
		</DefaultLayout>
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