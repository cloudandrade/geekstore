import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
	var url = window.location.pathname;
	return (
		<div className="App">
			<Router>{url === '/login' ? <Login /> : <Dashboard />}</Router>
		</div>
	);
}

export default App;
