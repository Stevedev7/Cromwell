import { AppBar, Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Link, Outlet } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import logoMobile from '../../assets/logo-mobile.svg'
import accountIcon from '../../assets/account.svg'
import './Header.css';

const Logo = ({ image, className = "" }) => {
	return <img src={image} alt="Logo" className={className} />
}

const Header = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<>
			<AppBar style={{ background: '#ffffff' }} position="static" className='nav-bar'>
				<Box className='nav-container'>
					<Logo
						image={isMobile ? logoMobile : logo}
						className={isMobile ? "logo-mobile" : "logo"}
					/>
					<Link to='/login' className='nav-icon-button'>
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