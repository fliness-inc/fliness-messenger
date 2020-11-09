import React from 'react';
import Grid from '@material-ui/core/Grid';
import classes from './info.module.scss';
import classNames from '@lib/classNames';

export const Info: React.FC = () => {
	return (
		<Grid
			container
			direction='row'
			alignItems='center'
			justify='space-between'
			className={classes.info}
		>
			<img src={'./info.png'} className={classes.phone}/>
			<Grid
				container
				direction='column' 
				className={classes.info}
			>
				<p className={classNames(classes.text, classes.text_h1)}>Fliness Messenger</p>
				<p className={classNames(classes.text, classes.text_h2)}>New Ways to Navigate<br/>Your Messenger</p>
				<p className={classNames(classes.text, classes.text_h3)}>All of your favorite features,<br/> organized to make it faster<br/> to find what you want</p>
			</Grid>
		</Grid>
	);
}

export default Info;