import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import classes from './signin.module.scss';
import LogoIcon from '@public/logo.svg';
import Button from '@material-ui/core/Button';
import EmailIcon from '@public/email.svg';
import UnlockIcon from '@public/unlock.svg';
import { tokenVar } from '@store/auth';
import { SIGN_IN } from '@components/forms/signin/signin.graphql';
import Padlock from '@public/padlock.svg';
import Link from "next/link";

export const SinInForm: React.FC = () => {
	const emailField = useRef<HTMLInputElement | null>(null);
	const passwordField = useRef<HTMLInputElement | null>(null);

	const [signIn] = useMutation(SIGN_IN);
	const [lock, setLock] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	async function handleButtonClick() {
		const email = emailField.current.value;
		const password = passwordField.current.value;

		setLock(true);

		signIn({
			variables: {
				payload: {
					email,
					password,
				}
			}
		})
		.then(({ data }) => {
			tokenVar(data.auth.login.accessToken);
			setError(null);
			router.push('/dialogs');
		})
		.catch(e => {
			if (e.message === `The user was not found with the email: ${email}`) 
				setError('Invalid email or password');
		})
		.finally(() => setLock(false));
	}

	return (
		<Grid
			container
			direction='column' 
			justify='center' 
			alignItems='center'
			className={classes.form__layout}
		>
			<LogoIcon className={classes.form__icon}/>
			<Typography className={classes.form__title}>Sign in</Typography>
			<Typography className={classes.form__description}>to get started</Typography>
            
			<form className={classes.inputs_layout} onSubmit={handleButtonClick.bind(this)}>

				{
					error ?
						<div className={classes.form__error_msg}>
							<Padlock className={classes.error_msg__icon}/>
							<p>{error}</p>
						</div>
						: null
				}

				<div className={classes.form__input}>
					<EmailIcon className={classes.input__icon}/>
					<input 
						type='text' 
						className={classes.input__shape} 
						placeholder={'Email address or phone number'} 
						ref={emailField}
					/>
				</div>

				<div className={classes.form__input}>
					<UnlockIcon className={classes.input__icon}/>
					<input 
						type='password' 
						className={classes.input__shape} 
						placeholder={'Password'} 
						ref={passwordField}
					/>
				</div>

			</form>

			<div className={classes.form__button_layout}>
				<Button
					className={classes.form__button}
					variant="contained"
					onClick={handleButtonClick.bind(this)}
					disableElevation
					disabled={lock}
				>
                    Continue
				</Button>
			</div>

			<Link href={'/signup'}>
				<Typography className={classes.form__link}>or sign up</Typography>
			</Link>
            
		</Grid>
	);
}

export default SinInForm;