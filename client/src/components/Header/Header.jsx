import { AppBar, Box, Link, useMediaQuery, useTheme } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import logoMobile from '../../assets/logo-mobile.svg'
import accountIcon from '../../assets/account.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './Header.css';
import { useLazyGetUserQuery } from '../../redux/slices/userApiSlice'
import { removeToken, setAuthenticated, setUserdetails } from '../../redux/slices/authSlice'
import { Snackbar, Alert } from '@mui/material';
import { hideSnackBar } from '../../redux/slices/snackBarSlice'

const Logo = ({ image, className = "", onClick }) => {
	return <img style={{ cursor: 'pointer' }} src={image} alt="Logo" className={className} onClick={(e) => { onClick(); e.preventDefault(); }} />
}

const Header = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate();
	const { isAuthenticated, token, userDetails } = useSelector(state => state.auth);
	const [getUserDetails] = useLazyGetUserQuery();
	const dispatch = useDispatch();


	const { open, severity, message } = useSelector(state => state.snackBar);

	useEffect(() => {
		// If the token isn't found set the isAuthenticated state to false. Meaning user isn't logged in.
		if (!token || token === "") {
			dispatch(setUserdetails({}));
			dispatch(setAuthenticated(false));
			return;
		}

		// If token is is present check if it is valid, by making a request to the backend.
		getUserDetails(token)
			.then(res => {
				// Set is Authenticated is true if there is no error and return the response data.
				if (!res.isError) {
					dispatch(setUserdetails({}));
					dispatch(setAuthenticated(true));
					return res.data
				}
				// If there is an error response, remove the token from the state.
				dispatch(removeToken());
				return null
			})
			.then(data => {
				// Set the userDetails state with response data.
				if (data) {
					dispatch(setUserdetails({ ...data }));
				}
			})
			// If there is a runtime error log it to the console (For now).
			.catch(e => console.log(e))
	}, [token, isAuthenticated]);

	useEffect(() => {
		setTimeout(() => dispatch(hideSnackBar()), 5000);
	}, [open]);

	const handleLoginClick = () => {
		if (isAuthenticated) {
			navigate('/user');
		}
		navigate('/login');
	}

	const handleSnackBarClose = () => {
		dispatch(hideSnackBar())
	}

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleSnackBarClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={handleSnackBarClose}
					severity={severity}
					variant="filled"
					sx={{ minWidth: '300px', minHeight: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					{message}
				</Alert>
			</Snackbar>
			<AppBar style={{ background: '#ffffff' }} position="static" className='nav-bar'>
				<Box className='nav-container' display="flex" justifyContent="space-between" alignItems="center">
					<Logo
						image={isMobile ? logoMobile : logo}  // Depending on the screen size logo changes. 
						className={isMobile ? "logo-mobile" : "logo"}
						onClick={() => navigate("/", { replace: true })}
					/>
					<Link onClick={handleLoginClick} color='#ff5100' className='nav-icon-button' sx={{ textDecoration: 'none', textDecorationColor: '#ff5100', display: 'flex', alignItems: 'center' }}>
						<img src={accountIcon} style={isMobile ? { maxHeight: 15 } : { maxHeight: 26 }} />
						<p className='my-account'></p>
						<p className='login-register' >{userDetails?.user ? isAuthenticated ? `${userDetails.user.firstName} ${userDetails.user.lastName}` : "Log in / Register" : "Log in / Register"}</p>
					</Link>
				</Box>
			</AppBar>

			<Outlet />
		</>
	)
}



export default Header