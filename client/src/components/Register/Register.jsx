import { Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Form } from 'react-router-dom'
import { useState } from 'react';

const Register = () => {

	const [visible, setVisible] = useState(false);
	const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
	const [disabled, setDisabled] = useState(true);

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
						<Link href='/login' color='#ff5100' sx={{ textDecoration: 'none' }} >
							Already have an online account? Log in here
						</Link>
					</Typography>
				</Grid>
				<Grid item container spacing={1} >
					<Form>
						<Grid container spacing={1} style={{ width: 400, margin: '10px 0px 0px 0px' }}>
							{/* First name */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									id="outlined-basic"
									label="First Name"
									variant="outlined"
									type='text'
									helperText="First Name Required"
								/>
							</Grid>
							{/* Last name */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									id="outlined-basic"
									label="Last Name"
									variant="outlined"
									type='text'
									helperText="Last Name Required"
								/>
							</Grid>

							{/* Email */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									id="outlined-basic"
									label="Email"
									variant="outlined"
									type='email'
									helperText="Email Required"
								/>
							</Grid>
							<Grid item sx={{ width: 400, padding: 0 }}>
								{/* Password Valdation Disply */}
								<Typography variant='h5' sx={{ marginBottom: '15px', fontSize: '1.125rem', fontWeight: 400 }}>
									Password must contain at least:
								</Typography>

								<Box sx={{ display: 'flex', alignItems: 'center' }} >
									<ErrorOutlineIcon sx={{ marginRight: '10px' }} />
									<Typography variant='p' color='#1976d2' >8 characters</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }} flex>
									<ErrorOutlineIcon sx={{ marginRight: '10px' }} />
									<Typography variant='p' color='#1976d2' >1 uppercase letter</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<ErrorOutlineIcon sx={{ marginRight: '10px' }} />
									<Typography variant='p' color='#1976d2' >1 lowercase letter</Typography>
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<ErrorOutlineIcon sx={{ marginRight: '10px' }} />
									<Typography variant='p' color='#1976d2' >1 number</Typography>
								</Box>
							</Grid>
							{/* Password */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
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

							{/* Confirm Password */}
							<Grid item sx={{ width: 400, padding: 0 }}>
								<TextField
									className='form'
									label="Confirm Password"
									variant="outlined"
									type={visible ? 'password' : 'text'}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={() => setVisible(!visibleConfirmPassword)} >
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
										color: disabled ? 'rgba(0, 0, 0, 0.26)' : 'white',
										backgroundColor: disabled ? '#e0e0e0' : '#ff5100',
										height: 55,
										padding: '6px 16px',
										width: '100%',
										fontSize: '1rem'
									}}
									disabled={disabled}
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