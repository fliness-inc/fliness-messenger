import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import classes from './signup.module.scss';
import LogoIcon from '@public/logo.svg';
import Button from '@material-ui/core/Button';
import EmailIcon from '@public/email.svg';
import UserIcon from '@public/user.svg';
import UnlockIcon from '@public/unlock.svg';
import { token } from '@store/auth';
import { LOGIN } from '@components/forms/signup/signup.graphql';
import Padlock from '@public/padlock.svg';
import Link from "next/link";

export const SignupForm: React.FC = () => {

	const userField = useRef(null);
	const emailField = useRef(null);
	const passwordField = useRef(null);
	const repeatField = useRef(null);

	const [login] = useMutation(LOGIN);
	const [lock, setLock] = useState(false);
	const [error, setError] = useState(null);
	//const router = useRouter();

	function handleButtonClick() {
		const user = userField.current.value;
		const email = emailField.current.value;
		const password = passwordField.current.value;
		const repeat = repeatField.current.value;

		setLock(true);
		login({
			 variables: {
				 payload: {
					user,
				 	email,
					password,
					repeat
				 }
			}
		}).then(res => {
			token(res.data.auth.login.accessToken);
			setError(null);
			setLock(false);
			//router.push('/chats');
		}).catch(e => {
			if (e.message === `The user was not found with the email: ${email}`) {
				setError('Invalid email or password');
				setLock(false);
			}
		});
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
			<Typography className={classes.form__title}>Sign up</Typography>
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
					<UserIcon className={classes.input__icon}/>
					<input 
						type='text' 
						className={classes.input__shape} 
						placeholder={'Username'} 
						ref={userField}
					/>
				</div>

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

				<div className={classes.form__input}>
					<UnlockIcon className={classes.input__icon}/>
					<input 
						type='password' 
						className={classes.input__shape} 
						placeholder={'Repeat Password'} 
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

			<Link href={'#'}>
				<Typography className={classes.form__link}>or Login in</Typography>
			</Link>
            
		</Grid>
	);
}

export default SignupForm;