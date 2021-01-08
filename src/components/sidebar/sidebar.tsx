import classes from './sidebar.module.scss';
import Grid from '@ui/grid/grid';
import DialogsIcon from '@public/chat_bubble_outline.svg';
import GroupsIcon from '@public/group.svg';
import ChannelsIcon from '@public/megaphone.svg';
import SettingsIcon from '@public/settings.svg';
import React from 'react';
import { useRouter } from 'next/router';
import { currentPage, Pages } from '@store/pages';
import classNames from 'classnames';

export interface MenuItemProps {
	active?: boolean
	Icon: any
	onClick?: () => void
	className?: string
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
	active = false, 
	Icon, 
	onClick = () => {}, 
	className = ''
}: MenuItemProps) => {
	return (
		<Grid>
			<button
				className={classNames(
					classes['menu__item'], 
					active ? classes['menu__item_active'] : '',
					className
				)}
				onClick={onClick}
			>
				<Icon className={classes['item__icon']} />
			</button>
		</Grid>
	);
}

export const SideBar: React.FC = () => {
	const router = useRouter();

	function handleClick(type, e) {
		currentPage(type);

		switch(type) {
			case Pages.DIALOGS:
				router.push('/dialogs');
				break;
			case Pages.GROUPS:
				router.push('/groups');
				break;
			case Pages.CHANNELS:
				router.push('/channels');
				break;
		}
	}

	return (
		<Grid
			className={classes['side-bar']}
		>
			<Grid 
				direction='column' 
				className={classes['side-bar__menu']}
			>
				<MenuItem 
					Icon={DialogsIcon} 
					onClick={handleClick.bind(this, Pages.DIALOGS)} 
					active={currentPage() === Pages.DIALOGS}
				/>
				<MenuItem 
					Icon={GroupsIcon} 
					onClick={handleClick.bind(this, Pages.GROUPS)} 
					active={currentPage() === Pages.GROUPS}
				/>
				<MenuItem 
					Icon={ChannelsIcon} 
					onClick={handleClick.bind(this, Pages.CHANNELS)} 
					active={currentPage() === Pages.CHANNELS}
				/>
			</Grid>
			<Grid
				justify='flex-end'
			>
				<MenuItem Icon={SettingsIcon} className={classes['item__bottom']}/>
			</Grid>
		</Grid>
	);
}

export default SideBar;

