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
const Login = () => {

	const [visible, setVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAuthenticated } = useSelector(store => store.auth);
	const [login] = useLoginMutation();


	useEffect(() => {
		if (isAuthenticated) {
			navigate("/user");
		}
	}, [isAuthenticated]);

	const handleSubmit = (e) => {
		e.preventDefault();
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
					<Grid item container spacing={1} >
						<Form onSubmit={handleSubmit}>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									<TextField
										className='form'
										label="Email"
										variant="outlined"
										type='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									<TextField
										className='form'
										label="Password"
										variant="outlined"
										type={visible ? 'text' : 'password'}
										onChange={(e) => setPassword(e.target.value)}
										value={password}
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
							<Grid item sx={{ marginTop: 10 }}>
								<Button
									sx={{
										color: disabled ? 'rgba(0, 0, 0, 0.26)' : 'white',
										backgroundColor: disabled ? '#e0e0e0' : '#ff5100',
										height: 55,
										padding: '6px 16px',
										width: '100%',
										fontSize: '1rem',
										':hover': {
											bgcolor: '#b23800'
										}
									}}
									disabled={disabled}
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