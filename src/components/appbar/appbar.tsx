import { NextPage } from 'next';
import MenuIcon from '@public/menu.svg';
import LogoIcon from '@public/logo.svg';
import ArrowDown from '@public/keyboard_arrow_down.svg';
import classes from '@components/appbar/appbar.module.scss';
import Grid from '@ui/grid/grid';
import Button from '@ui/button/button';

export interface AppBarProps {
	username: string;
	avatar: string;
}

export const AppBar: NextPage<AppBarProps> = ({ username, avatar }) => {
	return (
		<Grid 
			direction='row' 
			alignItems='center' 
			className={classes['app-bar']}
		>
			<Grid justify='space-between'>
				<Grid alignItems='center' justify='flex-start'>
					<Grid alignItems='center' justify='center' className={classes['menu']}>
						<Button className={classes['menu__btn']}>
							<MenuIcon className={classes['menu__icon']} />
						</Button>
					</Grid>
					<Grid alignItems='center'>
						<LogoIcon className={classes['logo__icon']}/>
						<h1 className={classes['logo__title']}>Fliness</h1>
					</Grid>
				</Grid>
				<Grid 
					alignItems='center' 
					justify='flex-end'
				>
					<Grid
						alignItems='center' 
						justify='flex-end'
						className={classes['account']}
					>
						<Button className={classes['account__btn']}>
							<p className={classes['account__username']}>{username}</p>
							<img className={classes['account__avatar']} alt='user avatar' src='./user.jpg' draggable={false}/>
							<ArrowDown className={classes['account__arrow-icon']} />
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default AppBar;