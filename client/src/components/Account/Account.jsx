import { Button, Typography, Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeToken, setAuthenticated, setUserdetails } from "../../redux/slices/authSlice";
import { showSnackBar } from "../../redux/slices/snackBarSlice";
import avatar from '../../assets/account.svg';


const Account = () => {

	const { userDetails, isAuthenticated } = useSelector(store => store.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(setAuthenticated(false));
		dispatch(removeToken());
		dispatch(setUserdetails({}));
		dispatch(showSnackBar({
			message: "Logged Out Successfully",
			severity: "success"
		}));
		navigate("/login")
	}

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
	}, [isAuthenticated]);

	return (
		<div>
			{userDetails && userDetails.user && (
				<>
					<Avatar src={avatar} alt={`${userDetails.user.firstName} ${userDetails.user.lastName}`} sx={{ width: 100, height: 100, margin: '10px' }} />
					<Typography variant="h5" component="h2">
						{`${userDetails.user.firstName} ${userDetails.user.lastName}`}
					</Typography>
					<Typography variant="body1" component="p">
						{userDetails.user.email}
					</Typography>
					<Button
						onClick={handleLogout}
					>Logout</Button>
				</>
			)}
		</div>
	)
}

export default Account