import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
	return <header>
		<nav>
			<Link className="navLink" to="/">Home</Link>
			<Link className="navLink" to="/register">Register</Link>
			<Link className="navLink" to="/login">Login</Link>
			<Link className="navLink" to="/profile">Profile</Link>
			<Link className="navLink" to="/products">Products</Link>
			<Link className="navLink" to="/cart">Cart</Link>
			<Link className="navLink" to="/orders">Orders</Link>
		</nav>
	</header>;
}

export default Header;