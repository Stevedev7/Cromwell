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

	// State for form data
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	// State to check password and confirm password matches;
	const [isPasswordMatch, setIsPasswordMatch] = useState(false);

	// States to check password validation
	const [has8Characters, setHas8Characters] = useState(false);
	const [hasUpperCase, setHasUppsecase] = useState(false);
	const [hasLowerCase, setHasLowercase] = useState(false);
	const [hasNumber, sethasNumber] = useState(false);

	// State to store field validation errors
	const [errors, setErrors] = useState({
		firstName: null,
		lastName: null,
		email: null,
		password: null,
		confirmPassword: null
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [register] = useRegisterMutation(); // RTK hook for registration
	const [login] = useLoginMutation(); // RTK hook for logging in

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

	// Function to handle field changes
	const handleFieldChange = (fieldName, value) => {
		setFormData(prevState => {
			switch (fieldName) {
				case 'firstName':
					return { ...prevState, firstName: value };
				case 'lastName':
					return { ...prevState, lastName: value };
				case 'email':
					return { ...prevState, email: value };
				case 'password':
					validatePassword(value);
					// validateField('password');
					return { ...prevState, password: value };
				case 'confirmPassword':
					// validateField('confirmPassword');
					return { ...prevState, confirmPassword: value };
				default:
					return prevState;
			}
		});
	};

	// General field validation function
	const validateField = (field) => {
		switch (field) {
			case 'firstName':
				if (formData.firstName.length === 0) {
					setErrors(({ ...errors, firstName: "First Name Required" }));
				} else {
					setErrors(({ ...errors, firstName: null }));
				}
				return formData.firstName.length !== 0;

			case 'lastName':
				if (formData.lastName.length === 0) {
					setErrors(({ ...errors, lastName: "Last Name Required" }));
				} else {
					setErrors(({ ...errors, lastName: null }));
				}
				return formData.lastName.length !== 0;

			case 'email':
				if (formData.email.length === 0) {
					setErrors(({ ...errors, email: "Email Required" }));
				} else if (!EMAIL_REGEX.test(formData.email)) {
					setErrors(({ ...errors, email: "Invalid Email Format" }));
				} else {
					setErrors(({ ...errors, email: null }));
				}
				return formData.email.length !== 0 && EMAIL_REGEX.test(formData.email);

			case 'password':
				if (formData.password.length !== 0) {
					setErrors(({ ...errors, password: null }));
				}
				if (!hasLowerCase) {
					setErrors(({ ...errors, password: "Must contain a lowercase letter" }));
				}
				if (!hasNumber) {
					setErrors(({ ...errors, password: "Must contain a number" }));
				}
				if (!hasUpperCase) {
					setErrors(({ ...errors, password: "Must contain an uppercase letter" }));
				}
				if (!has8Characters) {
					setErrors(({ ...errors, password: "New Password too short" }));
				}
				if (formData.password.length === 0) {
					setErrors(({ ...errors, password: "New Password Required" }));
				}
				return !errors.password;

			case 'confirmPassword':
				if (formData.confirmPassword.length !== 0) {
					setErrors(({ ...errors, confirmPassword: null }));
				}
				if (formData.confirmPassword !== formData.password) {
					setErrors(({ ...errors, confirmPassword: "Passwords do not match" }));
				}
				if (!(/[0-9]/.test(formData.confirmPassword))) {
					setErrors(({ ...errors, confirmPassword: "Must contain a number" }));
				}
				if (!/[a-z]/.test(formData.confirmPassword)) {
					setErrors(({ ...errors, confirmPassword: "Must contain a lowercase letter" }));
				}
				if (!(/[A-Z]/.test(formData.confirmPassword))) {
					setErrors(({ ...errors, confirmPassword: "Must contain an uppercase letter" }));
				}
				if (formData.confirmPassword.length < 8) {
					setErrors(({ ...errors, confirmPassword: "Confirm Password too short" }));
				}
				if (formData.confirmPassword.length === 0) {
					setErrors(({ ...errors, confirmPassword: "Confirm Password Required" }));
				}
				return !errors.confirmPassword;

			default:
				return true;
		}
	};

	// Function to return password validation icons
	const getValidationIcon = (isValid) => {
		return isValid ? <CheckIcon sx={{ marginRight: '10px', color: '#ff5100' }} /> : <ErrorOutlineIcon sx={{ marginRight: '10px' }} />;
	};

	// Function to check if all fields are valid so that the register button is functional
	const buttonDisable = () => !(formData.firstName.length > 0 && formData.lastName.length > 0 && formData.email.length > 0 && EMAIL_REGEX.test(formData.email) && isPasswordMatch && has8Characters && hasUpperCase && hasLowerCase && hasNumber)

	const handleSubmit = (e) => {
		e.preventDefault();
		// Register request to the API
		register(formData)
			.then(res => {
				if (res.error) {
					// Throw error from API
					throw new Error(res.error.data.error.message)
				}
				return res.data
			})
			.then(() => {
				//  If successfully registered, proceed  to make login request to the API
				login({ email: formData.email, password: formData.password })
					.then(res => {
						if (res.error) {
							throw new Error(res.error.data.error.message)
						}
						return res.data
					})
					.then(({ token }) => {
						dispatch(setToken(token)); // Set token to the state
						dispatch(setAuthenticated(true));
						// Display Snackbar to show success 
						dispatch(showSnackBar({
							severity: "success",
							message: "Successfully created an online account"
						}));
						navigate("/")
					})
					.catch(e => {
						// Set Snackbar to display error messages from login request
						dispatch(showSnackBar({
							severity: "error",
							message: e.message
						}))
					});
			})
			.catch(e => {
				// Error message from Register request
				dispatch(showSnackBar({
					severity: "error",
					message: e.message
				}))
			});
	}

	useEffect(() => {
		// If logged in already, redirect to Account page.
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
									onBlur={() => validateField('firstName')}
									helperText={errors.firstName || ""}
									error={!!errors.firstName}
									className='form'
									label="First Name"
									variant="outlined"
									type='text'
									onChange={e => handleFieldChange('firstName', e.target.value)}
									value={formData.firstName}
								/>
							</Grid>
							{/* Last name */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									onBlur={() => validateField('lastName')}
									helperText={errors.lastName || ""}
									error={!!errors.lastName}
									className='form'
									label="Last Name"
									variant="outlined"
									type='text'
									onChange={e => handleFieldChange('lastName', e.target.value)}
									value={formData.lastName}
								/>
							</Grid>

							{/* Email */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									label="Email"
									variant="outlined"
									type='email'
									onBlur={() => validateField('email')}
									helperText={errors.email || ""}
									error={!!errors.email}
									onChange={e => handleFieldChange('email', e.target.value)}
									value={formData.email}
								/>
							</Grid>

							{/* Password Validation Display */}
							<Grid item sx={{ width: 400, padding: 0 }}>
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
									onBlur={() => validateField('password')}
									error={!!errors.password}
									helperText={errors.password || ""}
									className='form'
									label="Password"
									variant="outlined"
									type={visible ? 'text' : 'password'} // Toggle visibility
									onChange={e => {
										handleFieldChange('password', e.target.value);
									}}
									value={formData.password}
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
									type={visibleConfirmPassword ? 'text' : 'password'} // Toggle visibility
									onChange={e => {
										handleFieldChange('confirmPassword', e.target.value);
										setIsPasswordMatch(formData.password === e.target.value);
									}}
									value={formData.confirmPassword}
									onBlur={() => validateField('confirmPassword')}
									error={!!errors.confirmPassword}
									helperText={errors.confirmPassword || ""}
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