import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
	return <header>
		<nav>
			<Link className="navLink" exact to="/">Home</Link>
			<Link className="navLink" exact to="/register">Register</Link>
			<Link className="navLink" exact to="/login">Login</Link>
			<Link className="navLink" exact to="/profile">Profile</Link>
			<Link className="navLink" exact to="/products">Products</Link>
			<Link className="navLink" exact to="/cart">Cart</Link>
			<Link className="navLink" exact to="/orders">Orders</Link>
		</nav>
	</header>;
}

export default Header;