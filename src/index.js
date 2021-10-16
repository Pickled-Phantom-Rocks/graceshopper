import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { 
	Header,
	Footer,
	Login,
	Register,
	Profile,
	Products,
	Cart,
	Orders
} from './components';

const App = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [username, setUsername] = useState('');
	const [userToken, setUserToken] = useState('');

	return <Router>
		<Header />
		<main>
			<Switch>
				<Route exact path="/">
					<div id="greeting">
						If you see this, Javascript is working.
					</div>
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/products">
					<Products />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/orders">
					<Orders />
				</Route>
				<Route>
					<h1>404 Page Not Found</h1>
				</Route>
			</Switch>
		</main>
		<Footer />
	</Router>

}

ReactDOM.render(<App />, document.getElementById('app'));