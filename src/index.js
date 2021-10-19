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
	Orders,
	Admin
} from './components';

const App = () => {
	const baseURL = 'http://localhost:3129/api';

	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
	const [isAdmin, setIsAdmin] = useState(false);
	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [userToken, setUserToken] = useState(localStorage.getItem("token"));

	return <Router>
		<Header />
		<main>
			<Switch>
				<Route exact path="/">
					<div id="greeting">
						If you see this, Javascript is working.
					</div>
				</Route>
				<Route path="/register">
					<Register baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} />
				</Route>
				<Route path="/login">
					<Login baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
				</Route>
				<Route path="/profile/">
					<Profile baseURL={baseURL} username={username} userToken={userToken}/>
				</Route>
				<Route path="/products">
					<Products baseURL={baseURL} />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/orders">
					<Orders />
				</Route>
				<Route path="/admin">
					<Admin baseURL={baseURL} />
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