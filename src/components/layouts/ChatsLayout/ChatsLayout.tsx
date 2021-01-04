import { NextPage } from 'next';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import useApollo from '@lib/use-apollo';
import { useQuery } from '@apollo/client';
import Error from 'next/error';
import Appbar from '@components/appbar/appbar';
import SideBar from '@components/sidebar/sidebar';
import { gql } from '@apollo/client';

export interface Props {
	data: {
		me: {
			name: string,
			avatar: string
		}
	}
	childrens?: JSX.Element[]
}

export const ChatsLayout: React.FC<Props> = ({ childrens, data }) => {
    return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Appbar username={data.me.name} avatar={data.me.avatar} />
			<Grid container direction="row" alignItems='center'>
				<SideBar />
				{childrens}
			</Grid>
		</Grid>
	);
}