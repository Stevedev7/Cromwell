import { Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Form, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLoginMutation } from '../../redux/slices/authApiSlice'
import { setAuthenticated, setToken } from '../../redux/slices/authSlice';
import { showSnackBar } from '../../redux/slices/snackBarSlice';
import { EMAIL_REGEX } from '../../constants';

const Login = () => {

	const [visible, setVisible] = useState(false); // State for password visibility

	// State for form data
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	// State for field validation errors
	const [errors, setErrors] = useState({
		email: null,
		password: null
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector(store => store.auth);
	const [login] = useLoginMutation(); // RTK hook for login

	// Function to handle field changes
	const handleFieldChange = (fieldName, value) => {
		setFormData(prevState => ({
			...prevState,
			[fieldName]: value
		}));

		validateField(fieldName);
	};

	// Field validation function
	const validateField = (fieldName) => {
		switch (fieldName) {
			case 'email':
				if (formData.email.length === 0) {
					setErrors({ ...errors, email: "Email Required" });
				} else {
					setErrors({ ...errors, email: null });
				}
				if (!EMAIL_REGEX.test(formData.email)) {
					setErrors({ ...errors, email: "Invalid Email Format" });
				} else {
					setErrors({ ...errors, email: null });
				}
				break;
			case 'password':
				if (formData.password.length === 0) {
					setErrors({ ...errors, password: "Password Required" });
				} else {
					setErrors({ ...errors, password: null });
				}
				break;
			default:
				break;
		}
	};

	const buttonDisabled = () => !(formData.email.length > 0 && EMAIL_REGEX.test(formData.email) && formData.password.length > 0);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/user");
		}
	}, [isAuthenticated]);

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email: formData.email, password: formData.password })
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
					message: "Logged In Successfully"
				}));
				navigate("/user")
			})
			.catch(e => {
				dispatch(showSnackBar({
					severity: "error",
					message: e.message
				}))
			});
	}

	return (
		<>
			<Box className='form-container' flex>
				<Grid container spacing={1} style={{ width: 400 }}>
					<Grid className='form-header' item >
						<Typography variant='h3' >
							Login
						</Typography>
					</Grid>
					<Grid className='form-text' item >
						<Typography variant='p'>
							Please enter your email and password to access your account.
						</Typography>
					</Grid>
					<Grid className='form-text' item >
						<Typography>
							<Link href="/register" color='#ff5100' sx={{ textDecoration: 'none' }} onClick={(e) => { navigate("/register"); e.preventDefault() }} >
								Not purchased from us before? Register a new account here
							</Link>
						</Typography>
					</Grid>
					{/* Login form */}
					<Grid item container spacing={1} >
						<Form onSubmit={handleSubmit}>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									{/* Email */}
									<TextField
										error={!!errors.email}
										onBlur={() => validateField('email')}
										className='form'
										label="Email"
										variant="outlined"
										type='email'
										name="email"
										onChange={(e) => handleFieldChange('email', e.target.value)}
										value={formData.email}
										helperText={errors.email}
										sx={{
											':focus': {
												borderColor: '#ff5100'
											}
										}}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									{/* Password */}
									<TextField
										error={!!errors.password}
										onBlur={() => validateField('password')}
										helperText={errors.password}
										className='form'
										label="Password"
										variant="outlined"
										type={visible ? 'text' : 'password'}
										name="password"
										onChange={(e) => handleFieldChange('password', e.target.value)}
										value={formData.password}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton onClick={() => setVisible(!visible)} >
														{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
													</IconButton>
												</InputAdornment>
											)
										}}
									/>
								</Grid>
							</Grid>
							{/* Submit button */}
							<Grid item sx={{ marginTop: 10 }}>
								<Button
									sx={{
										color: buttonDisabled() ? 'rgba(0, 0, 0, 0.26)' : 'white',
										backgroundColor: buttonDisabled() ? '#e0e0e0' : '#ff5100',
										height: 55,
										padding: '6px 16px',
										width: '100%',
										fontSize: '1rem',
										':hover': {
											bgcolor: '#b23800'
										}
									}}
									disabled={buttonDisabled()}
									type='submit'
									className='submit-button'
								>
									Login</Button>
							</Grid>
						</Form>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default Login