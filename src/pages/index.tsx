import { NextPage } from 'next';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@public/menu.svg';
import LogoIcon from '@public/logo.svg';
import useApollo from '@src/lib/use-apollo';
import classes from '@pages/index.module.scss';

export const Home: NextPage = () => {
	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<AppBar position="sticky" className={classes.app_bar}>
				<Toolbar>
					<IconButton>
						<MenuIcon className={classes.menu_icon} />
					</IconButton>
					<div className={classes.logo}>
						<LogoIcon className={classes.logo__icon}/>
						<Typography className={classes.logo__title}>Fliness</Typography>
					</div>
				</Toolbar>
			</AppBar>
		</Grid>
	);
};

export default useApollo(Home);
