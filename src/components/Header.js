import React from 'react';
import { Link } from "react-router-dom";

const Header = (props) => {
	const {isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, setUserToken, setUserId, setUsername} = props;

	function logOut() {
		setIsLoggedIn(false);
		setIsAdmin(false);
		setUserToken('');
		setUserId('');
		setUsername('');
		localStorage.clear();
	}

	return <header>
		{/* <img src={process.env.PUBLIC_URL + 'images/cat.gif'} /> */}
		<nav>
			<Link className="navLink" to="/">Home</Link>
			{!isLoggedIn ? <Link className="navLink" to="/register">Register</Link> : null}
			{!isLoggedIn ? <Link className="navLink" to="/login">Login</Link> : null}
			{isLoggedIn ? <Link className="navLink" to="/profile">Profile</Link> : null}
			{isLoggedIn ? <Link className="navLink" to="/products">Products</Link> : null}
			{isLoggedIn ? <Link className="navLink" to="/cart">Cart</Link> : null}
			{isLoggedIn ? <Link className="navLink" to="/orders">Orders</Link> : null}
			{isAdmin ? <Link className="navLink" to="/admin">Admin</Link> : null}
			{isLoggedIn ? <Link to="/"><button onClick={() => logOut()} className="navLink">Log Out</button></Link> : null }
		</nav>
	</header>;
}

export default Header;