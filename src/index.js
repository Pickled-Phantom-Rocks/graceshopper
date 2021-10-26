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
	Admin,
	SingleProduct
} from './components';

const App = () => {
	const baseURL = 'http://localhost:3155/api';

	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
	const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [userToken, setUserToken] = useState(localStorage.getItem("token"));
	const [userId, setUserId] = useState(localStorage.getItem("userId"));

	return <Router>
		<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} setUsername={setUsername} setUserToken={setUserToken} setUserId={setUserId} />
		<main>
			<Switch>
				<Route exact path="/">
					<div id="greeting">
						If you see this, Javascript is working.
					</div>
				</Route>
				<Route path="/register">
					<Register baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
				</Route>
				<Route path="/login">
					<Login baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
				</Route>
				<Route path="/profile/">
					<Profile baseURL={baseURL} username={username} userToken={userToken} userId={userId}/>
				</Route>
				<Route path="/products">
					<Products baseURL={baseURL} userId={userId}/>
				</Route>
				<Route path="/product/:id">
					<SingleProduct baseURL={baseURL}/>
				</Route>
				<Route path="/cart">
					<Cart userId={userId} username={username} baseURL={baseURL}/>
				</Route>
				<Route path="/orders">
					<Orders baseURL={baseURL} userId={userId} username={username} />
				</Route>
				<Route path="/admin">
					<Admin baseURL={baseURL} userToken={userToken} />
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