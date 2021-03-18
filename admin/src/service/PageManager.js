import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/index';
import Produtos from '../pages/Produtos/index';

// import { Container } from './styles';

function service() {
	return (
		<>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/produtos" component={Produtos} />
			</Switch>
		</>
	);
}

export default service;
