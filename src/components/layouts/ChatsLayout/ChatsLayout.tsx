import React from 'react';
import Grid from '@ui/grid/grid';
import Appbar from '@components/appbar/appbar';
import SideBar from '@components/sidebar/sidebar';

export interface Props {
	data: {
		me: {
			name: string,
			avatar: string
		}
	}
	children?: JSX.Element | JSX.Element[] 
}

export const ChatsLayout: React.FC<Props> = ({ children, data }) => {
    return (
		<Grid direction='column' justify='center' alignItems='center'>
			<Appbar username={data.me.name} avatar={data.me.avatar} />
			<Grid direction='row' wrap='nowrap'>
				<SideBar />
				<Grid direction='row'>
					{children}
				</Grid>
			</Grid>
		</Grid>
	);
}