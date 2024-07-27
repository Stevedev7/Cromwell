import { Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Form } from 'react-router-dom'
import { useState } from 'react';

const Login = () => {

	const [visible, setVisible] = useState(false);
	const [disabled, setDisabled] = useState(true);

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
							<Link href="/register" color='#ff5100' sx={{ textDecoration: 'none' }} >
								Not purchased from us before? Register a new account here
							</Link>
						</Typography>
					</Grid>
					<Grid item container spacing={1} >
						<Form>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									<TextField className='form' id="outlined-basic" label="Email" variant="outlined" type='email' />
								</Grid>
							</Grid>
							<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
								<Grid item style={{ width: 400, padding: 0 }}>
									<TextField
										className='form'
										id="outlined-basic"
										label="Password"
										variant="outlined"
										type={visible ? 'password' : 'text'}
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
							</Grid>
							<Grid item style={{ marginTop: 10 }}>
								<Button
									style={{
										color: disabled ? 'rgba(0, 0, 0, 0.26)' : 'white',
										backgroundColor: disabled ? '#e0e0e0' : '#ff5100',
										height: 55,
										padding: '6px 16px',
										width: '100%',
										fontSize: '1rem'
									}}
									disabled={disabled}
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