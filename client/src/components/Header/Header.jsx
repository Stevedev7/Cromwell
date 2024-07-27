import { AppBar, Box, IconButton, Link, useMediaQuery, useTheme } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import logoMobile from '../../assets/logo-mobile.svg'
import accountIcon from '../../assets/account.svg'
import './Header.css';

const Logo = ({ image, className = "", onClick }) => {
	return <img style={{ cursor: 'pointer' }} src={image} alt="Logo" className={className} onClick={onClick} />
}

const Header = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const navigate = useNavigate();

	return (
		<>
			<AppBar style={{ background: '#ffffff' }} position="static" className='nav-bar'>
				<Box className='nav-container'>
					<Logo
						image={isMobile ? logoMobile : logo}
						className={isMobile ? "logo-mobile" : "logo"}
						onClick={() => navigate("/")}
					/>
					<Link href='/login' color='#ff5100' className='nav-icon-button' sx={{ textDecoration: 'none', textDecorationColor: '#ff5100' }}>
						<img src={accountIcon} style={isMobile ? { maxHeight: 15 } : { maxHeight: 26 }} />
						<p className='my-account'></p>
						<p className='login-register' >Log in / Register</p>
					</Link>
				</Box>
			</AppBar>
			<Outlet />
		</>
	)
}



export default Header