import { NextPage } from 'next';
import useApollo from '@lib/use-apollo';
import Grid from '@material-ui/core/Grid';
import WaveIcon from '@public/wave.svg';
import LoginForm from '@components/forms/signin/signin';
import classes from './index.module.scss';
import Info from '@components/info/info';

export const SignIn: NextPage = () => {
	return (
		<Grid
			container
			direction='column'
			justify='center' 
			alignItems='center'
			className={classes.page}
		>
			<WaveIcon className={classes.page__background} />
			<Grid 
				container
				direction='row' 
				justify='space-between' 
				alignItems='center'
				className={classes.container}
			>
				<Info />
				<LoginForm />
			</Grid>
		</Grid>
	);
};

export default useApollo(SignIn);