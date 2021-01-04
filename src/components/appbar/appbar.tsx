import { NextPage } from 'next';
import UpBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@public/menu.svg';
import LogoIcon from '@public/logo.svg';
import classes from './appbar.module.scss';
import { GET_AUTH_USER } from './appbar.graphql';
import { useQuery } from '@apollo/client';
import ArrowDown from '@public/keyboard_arrow_down.svg';
import Button from '@material-ui/core/Button';

export interface AppBarProps {
	username: string;
	avatar: string;
}

export const AppBar: NextPage<AppBarProps> = ({ username, avatar }) => {
	return (
		<UpBar position="sticky" className={classes.app_bar}>
			<Toolbar className={classes.app_bar__layout}>
				<div className={classes.layout__left}>
					<IconButton>
						<MenuIcon className={classes.menu_icon} />
					</IconButton>
					<div className={classes.logo}>
						<LogoIcon className={classes.logo__icon}/>
						<Typography className={classes.logo__title}>Fliness</Typography>
					</div>
				</div>
				<Button className={classes.layout__right}>
					<p className={classes.account__username}>{username}</p>
					<img className={classes.account__avatar} src='./user.jpg' draggable={false}/>
					<ArrowDown className={classes.account__arrow_icon} />
				</Button>
			</Toolbar>
		</UpBar>
	);
}

export default AppBar;