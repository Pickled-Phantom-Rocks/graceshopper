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
		<nav>
			<div>
				<Link className="navLink" to="/">Home</Link>
				<Link className="navLink" to="/products">Products</Link>
			</div>
			<div>
				{isLoggedIn ? <Link className="navLink" to="/profile">Profile</Link> : null}
				{isLoggedIn ? <Link className="navLink" to="/cart">Cart</Link> : null}
				{isAdmin ? <Link className="navLink" to="/admin">Admin</Link> : null}
				{isLoggedIn ? <Link to="/"><button onClick={() => logOut()} className="navLink">Logout</button></Link> : null }
			</div>
		</nav>
	</header>;
}

export default Header;