import classes from './sidebar.module.scss';
import Grid from '@material-ui/core/Grid';
import DialogsIcon from '@public/chat_bubble_outline.svg';
import GroupsIcon from '@public/group.svg';
import ChannelsIcon from '@public/megaphone.svg';
import SettingsIcon from '@public/settings.svg';
import React from 'react';
import Button from "@material-ui/core/Button";
import classNames from "@lib/classNames";

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
		>
			<Icon className={classes.item__icon} />
		</Button>
	);
}

export const SideBar = () => {
	return (
		<Grid
			container
			direction='column'
			className={classes.sidebar}
		>
			<div className={classes.sidebar__main_menu}>
				<MenuItem isActive={true} Icon={DialogsIcon}/>
				<MenuItem Icon={GroupsIcon}/>
				<MenuItem Icon={ChannelsIcon}/>
			</div>

			<MenuItem Icon={SettingsIcon} className={classes.item__bottom}/>
		</Grid>
	);
}

export default SideBar;

