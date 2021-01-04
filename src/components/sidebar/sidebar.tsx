import classes from './sidebar.module.scss';
import Grid from '@material-ui/core/Grid';
import DialogsIcon from '@public/chat_bubble_outline.svg';
import GroupsIcon from '@public/group.svg';
import ChannelsIcon from '@public/megaphone.svg';
import SettingsIcon from '@public/settings.svg';
import React from 'react';
import Button from "@material-ui/core/Button";
import classNames from "@lib/classNames";
import { useRouter } from 'next/router';
import { currentPage, Pages } from '@store/pages';

export interface MenuItemProps {
	isActive?: boolean;
	Icon: any;
	onClick?: () => void;
	className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ isActive, Icon, onClick, className }: MenuItemProps) => {
	return (
		<Button
			className={
				classNames(classes.menu__item, isActive ? classes.menu__item_active : '', className)
			}
			onClick={onClick}
		>
			<Icon className={classes.item__icon} />
		</Button>
	);
}

export const SideBar: React.FC = () => {
	const router = useRouter();

	

	function handleClick(type, e) {
		switch(type) {
			case 'dialogs':
				currentPage(Pages.DIALOGS);
				router.push('/dialogs');
				break;
			case 'groups':
				currentPage(Pages.GROUPS);
				router.push('/groups');
				break;
			case 'channels':
				currentPage(Pages.CHANNELS);
				router.push('/channels');
				break;
		}
	}

	return (
		<Grid
			container
			className={classes.sidebar}
		>
			<Grid container direction='column' className={classes.sidebar__main_menu}>
				<MenuItem 
					Icon={DialogsIcon} 
					onClick={handleClick.bind(this, 'dialogs')} 
					isActive={currentPage() === Pages.DIALOGS}
				/>
				<MenuItem 
					Icon={GroupsIcon} 
					onClick={handleClick.bind(this, 'groups')} 
					isActive={currentPage() === Pages.GROUPS}
				/>
				<MenuItem 
					Icon={ChannelsIcon} 
					onClick={handleClick.bind(this, 'channels')} 
					isActive={currentPage() === Pages.CHANNELS}
				/>
			</Grid>
			<MenuItem Icon={SettingsIcon} className={classes.item__bottom}/>
		</Grid>
	);
}

export default SideBar;

