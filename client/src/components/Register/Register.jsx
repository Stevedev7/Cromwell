import { Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckIcon from '@mui/icons-material/Check';
import { Form, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../redux/slices/userApiSlice';
import { setAuthenticated, setToken } from '../../redux/slices/authSlice';
import { showSnackBar } from '../../redux/slices/snackBarSlice';
import { useLoginMutation } from '../../redux/slices/authApiSlice';
import { EMAIL_REGEX } from '../../constants';

const Register = () => {

	const [visible, setVisible] = useState(false);
	const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
	const { isAuthenticated } = useSelector(store => store.auth);



	// States for form data
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// State to check password and confirm password matches;
	const [isPasswordMatch, setIsPasswordMatch] = useState(false);

	// States to check password validation
	const [has8Characters, setHas8Characters] = useState(false);
	const [hasUpperCase, setHasUppsecase] = useState(false);
	const [hasLowerCase, setHasLowercase] = useState(false);
	const [hasNumber, sethasNumber] = useState(false);

	const [errors, setErrors] = useState({
		firstName: null,
		lastName: null,
		email: null,
		password: null,
		confirmPassword: null
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [register] = useRegisterMutation();
	const [login] = useLoginMutation();

	const validatePassword = (password) => {
		const has8Characters = password.length >= 8;
		const hasUpperCase = /[A-Z]/.test(password);
		const hasLowerCase = /[a-z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		setHas8Characters(has8Characters);
		setHasUppsecase(hasUpperCase);
		setHasLowercase(hasLowerCase);
		sethasNumber(hasNumber);
	};

	const firstNameValidation = () => {
		if (firstName.length === 0) {
			setErrors({ ...errors, firstName: "First Name Required" });
		} else {
			setErrors({ ...errors, firstName: null });
		}
		return firstName.length !== 0;
	}

	const lastNameValidation = () => {
		if (lastName.length === 0) {
			setErrors({ ...errors, lastName: "Last Name Required" });
		} else {
			setErrors({ ...errors, lastName: null });
		}
		return lastName.length !== 0;
	}

	const emailValidation = () => {
		if (email.length === 0) {
			setErrors({ ...errors, email: "Email Required" });
		} else if (!EMAIL_REGEX.test(email)) {
			setErrors({ ...errors, email: "Invalid Email Format" });
		} else {
			setErrors({ ...errors, email: null });
		}
		return email.length !== 0 && EMAIL_REGEX.test(email);
	}

	const passwordValidation = () => {
		if (password.length === 0) {
			setErrors({ ...errors, password: "New Password Required" });
		}
		if (!has8Characters) {
			setErrors({ ...errors, password: "New Password too short" });
		}
		if (!hasUpperCase) {
			setErrors({ ...errors, password: "Must contain a uppercase letter" })
		}
		if (!hasLowerCase) {
			setErrors({ ...errors, password: "Must contain a lowercase letter" })
		}
		if (!hasNumber) {
			setErrors({ ...errors, password: "Must contain a number" })
		}
		if (password.length !== 0) {
			setErrors({ ...errors, password: null });
		}
		return !errors.password;
	}

	const confirmPasswordValidation = () => {
		if (confirmPassword.length === 0) {
			setErrors({ ...errors, confirmPassword: "New Confirm Password Required" });
		}
		if (confirmPassword.length < 8) {
			setErrors({ ...errors, confirmPassword: "Confirm Password too short" });
		}
		if (!(/[A-Z]/.test(confirmPassword))) {
			setErrors({ ...errors, confirmPassword: "Must contain a uppercase letter" })
		}
		if (!/[a-z]/.test(confirmPassword)()) {
			setErrors({ ...errors, confirmPassword: "Must contain a lowercase letter" })
		}
		if (!(/[0-9]/.test(confirmPassword))) {
			setErrors({ ...errors, confirmPassword: "Must contain a number" })
		}
		if (confirmPassword.length !== 0) {
			setErrors({ ...errors, confirmPassword: null });
		}
		if (confirmPassword !== password) {
			setErrors({ ...errors, confirmPassword: "Passwords do not match" });
		}

		return !errors.confirmPassword;
	}

	const handleFirstNameChange = e => {
		setFirstName(e.target.value);
		firstNameValidation();
	}
	const handleLastNameChange = e => {
		setLastName(e.target.value);
		lastNameValidation();
	}

	const handleEmailChange = e => {
		setEmail(e.target.value);
		emailValidation();
	}

	const handlePasswordChange = (e) => {
		const password = e.target.value;
		setPassword(password);
		passwordValidation(password);
	};

	const handleConfirmPasswordChange = (e) => {
		const confirmPassword = e.target.value;
		setConfirmPassword(confirmPassword);
		setIsPasswordMatch(password === confirmPassword);
		confirmPasswordValidation();
	};

	const getValidationIcon = (isValid) => {
		return isValid ? <CheckIcon sx={{ marginRight: '10px', color: '#ff5100' }} /> : <ErrorOutlineIcon sx={{ marginRight: '10px' }} />;
	};

	const buttonDisable = () => !(firstName.length > 0 && lastName.length > 0 && email.length > 0 && isPasswordMatch && has8Characters && hasUpperCase && hasLowerCase && hasNumber)

	const handleSubmit = (e) => {
		e.preventDefault();
		register({
			firstName,
			lastName,
			email,
			password,
			confirmPassword
		})
			.then(res => {
				if (res.error) {
					throw new Error(res.error.data.error.message)
				}
				return res.data
			})
			.then(() => {
				login({ email, password })
					.then(res => {
						if (res.error) {
							throw new Error(res.error.data.error.message)
						}
						return res.data
					})
					.then(({ token }) => {
						dispatch(setToken(token));
						dispatch(setAuthenticated(true));
						dispatch(showSnackBar({
							severity: "success",
							message: "Successfully created an online account"
						}));
						navigate("/")
					})
					.catch(e => {
						dispatch(showSnackBar({
							severity: "error",
							message: e.message
						}))
					});
			})
			.catch(e => {
				dispatch(showSnackBar({
					severity: "error",
					message: e.message
				}))
			});
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/user");
		}
	}, [isAuthenticated]);

	return (
		<Box className='form-container' flex>
			<Grid container spacing={1} sx={{ width: 400 }}>
				<Grid className='form-header' item sx={{ padding: 0 }} >
					<Typography variant='h3'>
						Register Online Account
					</Typography>
				</Grid>
				<Grid className='form-text' item sx={{ padding: 0 }} >
					<Typography variant='p'>
						We will use this information to secure your account and provides access via www.cromwell.co.uk.{" "}
						<Link href='/login' color='#ff5100' sx={{ textDecoration: 'none' }} onClick={(e) => { navigate("/login"); e.preventDefault() }}>
							Already have an online account? Log in here
						</Link>
					</Typography>
				</Grid>
				<Grid item container spacing={1} >
					<Form onSubmit={handleSubmit}>
						<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
							{/* First name */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									onBlur={firstNameValidation}
									helperText={errors.firstName}
									error={errors.firstName}
									className='form'
									label="First Name"
									variant="outlined"
									type='text'
									onChange={handleFirstNameChange}
									value={firstName}
								/>
							</Grid>
							{/* Last name */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									onBlur={lastNameValidation}
									helperText={errors.lastName}
									error={errors.lastName}
									className='form'
									label="Last Name"
									variant="outlined"
									type='text'
									onChange={handleLastNameChange}
									value={lastName}
								/>
							</Grid>

							{/* Email */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									label="Email"
									variant="outlined"
									type='email'
									onBlur={emailValidation}
									helperText={errors.email}
									error={errors.email}
									onChange={handleEmailChange}
									value={email}
								/>
							</Grid>
							<Grid item sx={{ width: 400, padding: 0 }}>
								{/* Password Valdation Disply */}
								<Typography variant='h5' sx={{ marginBottom: '15px', fontSize: '1.125rem', fontWeight: 400 }}>
									Password must contain at least:
								</Typography>

								<Box sx={{ display: 'flex', alignItems: 'center' }} >
									{getValidationIcon(has8Characters)}
									<Typography variant='p' color='#1976d2' >8 characters</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }} flex>
									{getValidationIcon(hasUpperCase)}
									<Typography variant='p' color='#1976d2' >1 uppercase letter</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{getValidationIcon(hasLowerCase)}
									<Typography variant='p' color='#1976d2' >1 lowercase letter</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{getValidationIcon(hasNumber)}
									<Typography variant='p' color='#1976d2' >1 number</Typography>
								</Box>
							</Grid>
							{/* Password */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									onBlur={passwordValidation}
									error={errors.password}
									helperText={errors.password}
									className='form'
									label="Password"
									variant="outlined"
									type={visible ? 'text' : 'password'}
									onChange={handlePasswordChange}
									value={password}
									// Password show icon
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setVisible(!visible)} >
													{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							</Grid>

							{/* Confirm Password */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									label="Confirm Password"
									variant="outlined"
									type={visibleConfirmPassword ? 'text' : 'password'}
									onChange={handleConfirmPasswordChange}
									value={confirmPassword}
									onBlur={confirmPasswordValidation}
									error={errors.confirmPassword}
									helperText={errors.confirmPassword}
									// Password show icon
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setVisibleConfirmPassword(!visibleConfirmPassword)} >
													{visibleConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							</Grid>
							{/* Submit button */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<Button
									sx={{
										color: buttonDisable() ? 'rgba(0, 0, 0, 0.26)' : 'white',
										backgroundColor: buttonDisable() ? '#e0e0e0' : '#ff5100',
										height: 55,
										padding: '6px 16px',
										width: '100%',
										fontSize: '1rem',
										':hover': {
											bgcolor: '#b23800'
										}
									}}
									type='submit'
									disabled={buttonDisable()}
								>
									Register</Button>
							</Grid>
						</Grid>
					</Form>
				</Grid>
			</Grid>
		</Box>
	)
}

export default Register