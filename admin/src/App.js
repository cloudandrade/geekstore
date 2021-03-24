import React, { useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/index';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
	Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import { ensureAuthenticated } from './service/AuthUtils';
import Home from './pages/Home/index';
import { getServerOnline } from './service/requests';

function App() {
	let history = useHistory();
	var url = window.location.pathname;
	const [auth, setAuth] = React.useState(false);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [localStorage]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						{auth === true ? <Dashboard /> : <Redirect to="/login" />}
					</Route>
					<Route path="/produtos">
						{auth === true ? <Dashboard /> : <Redirect to="/login" />}
					</Route>
					<Route path="/usuarios">
						{auth === true ? <Dashboard /> : <Redirect to="/login" />}
					</Route>
					<Route path="/home">
						{auth === true ? <Dashboard /> : <Redirect to="/login" />}
					</Route>

					<Route path="/login" component={Login} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
