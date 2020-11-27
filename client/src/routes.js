import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/index';
import Camisas from './pages/Camisas/index';
import Copos from './pages/Copos/index';
import Acessorios from './pages/Acessorios/index';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route path="/camisas" component={Camisas}></Route>
				<Route path="/copos" component={Copos}></Route>
				<Route path="/acessorios" component={Acessorios}></Route>
				{/* Rotas a adicionar ainda -> login, cadastro, perfil, busca, e carrinho */}
			</Switch>
		</BrowserRouter>
	);
}
