import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
	return <header>
		{/* <img src={process.env.PUBLIC_URL + 'images/cat.gif'} /> */}
		<nav>
			<Link className="navLink" to="/">Home</Link>
			<Link className="navLink" to="/register">Register</Link>
			<Link className="navLink" to="/login">Login</Link>
			<Link className="navLink" to="/admin">Admin</Link>
			<Link className="navLink" to="/profile">Profile</Link>
			<Link className="navLink" to="/products">Products</Link>
			<Link className="navLink" to="/cart">Cart</Link>
			<Link className="navLink" to="/orders">Orders</Link>
			Logout
		</nav>
	</header>;
}

export default Header;