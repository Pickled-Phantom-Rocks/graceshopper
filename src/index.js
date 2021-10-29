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
	const [showLog, setShowLog] = useState(true);

	return <Router>
		<Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} setUsername={setUsername} setUserToken={setUserToken} setUserId={setUserId} />
		<main>
			<Switch>
				<Route exact path="/">
					{isLoggedIn ? <div id="greeting">If you see this, Javascript is working and you're logged in.</div> : null}
					{isLoggedIn ? null : 
						<div id="logReg">
							{showLog ? <div>
								<Login baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} /><br/>
								Not a member?<br/><br/>
								<button onClick={() => setShowLog(false)}>Register</button>
							</div> : <div>
								<Register baseURL={baseURL} setUsername= {setUsername} setUserToken={setUserToken} setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
								Already a member?<br/><br/>
								<button onClick={() => setShowLog(true)}>Login</button>
								</div>}
						</div>
					}
				</Route>
				<Route path="/profile/">
					<Profile baseURL={baseURL} username={username} userToken={userToken} userId={userId}/>
				</Route>
				<Route path="/products">
					<Products baseURL={baseURL} userId={userId} userToken={userToken} />
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