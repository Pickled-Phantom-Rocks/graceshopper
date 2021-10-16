import {React, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [username, setUsername] = useState('');
	const [userToken, setUserToken] = useState('');

	return <p>If you see this, Javascript is working</p>
}

ReactDOM.render(<App />, document.getElementById('app'));