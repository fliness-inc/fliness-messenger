import React from 'react';
import Grid from '@ui/grid/grid';
import Appbar from '@components/app-bar/app-bar';
import { menuStateVar, MenuStateEnum } from '@store/menu';
import { gql, useQuery } from '@apollo/client';
import { Dialog } from '@ui/dialog/dialog';

export interface Props {
    username: string,
    avatarURL: string
    children?: JSX.Element | JSX.Element[] | string,
    
    sidebar: JSX.Element,
    listbar: JSX.Element,
}

export const DefaultLayout: React.FC<Props> = ({
    username,
    avatarURL,
    children,
    sidebar,
    listbar
}: Props) => {
    const { data: { localState: { menuState } } } = useQuery(gql`
		query {
			localState @client {
				menuState
			}
		}
	`);

	const handleWindowResize = React.useCallback(() => {
		if (window.innerWidth >= 1024 && menuStateVar() !== MenuStateEnum.MOVING_DEACTIVE)
			menuStateVar(MenuStateEnum.MOVING_ACTIVE);
		else if (window.innerWidth < 1024 && window.innerWidth > 720)
			menuStateVar(MenuStateEnum.MOVING_ON_TOP_DEACTIVE);
		else if (window.innerWidth < 720)
			menuStateVar(MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE);
	}, []);


	React.useEffect(() => {
		handleWindowResize();

		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	const showSidebar = !(menuState === MenuStateEnum.NONE ||
						menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE ||
						menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE);

	const showListBar = menuState === MenuStateEnum.MOVING_ACTIVE ||
                        menuState === MenuStateEnum.MOVING_DEACTIVE;
                        
    return (
        <Grid direction='column' justify='center' alignItems='center'>
			<Appbar username={username} avatarURL={avatarURL} />
            <Grid direction='row' wrap='nowrap'>
                { showSidebar ? sidebar : null }
                { showListBar ? listbar : null }
                {children}
			</Grid>

			<Dialog 
				open={menuState === MenuStateEnum.MOVING_ON_TOP_ACTIVE} 
				onClose={() => menuStateVar(MenuStateEnum.MOVING_ON_TOP_DEACTIVE)}
			>
                <Grid direction='column' justify='center' alignItems='center'>
					<Appbar username={username} avatarURL={avatarURL} />
					<Grid direction='row' wrap='nowrap'>
                        {sidebar}
                        {listbar}
					</Grid>
				</Grid>
			</Dialog>

			<Dialog 
				open={menuState === MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_ACTIVE}
				onClose={() => menuStateVar(MenuStateEnum.MOVING_ON_TOP_WITH_SIDE_BAR_DEACTIVE)}
			>
				<Grid direction='column' justify='center' alignItems='center'>
					<Appbar username={username} avatarURL={avatarURL} />
					<Grid direction='row' wrap='nowrap'>
                        {listbar}
					</Grid>
				</Grid>
			</Dialog>
        </Grid>
    );
};

export default DefaultLayout;