import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
	return <p>If you see this, Javascript is working</p>
}

ReactDOM.render(<App />, document.getElementById('app'));