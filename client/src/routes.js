import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/index';
import Camisas from './pages/Camisas/index';
import Copos from './pages/Copos/index';
import Acessorios from './pages/Acessorios/index';
import ProdutoDetalhes from './pages/ProdutoDetalhes'

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				
				<Route path="/camisas" component={Camisas}></Route>
				<Route  path="/camisas/:ID" component={ProdutoDetalhes}></Route>
				<Route path="/copos" component={Copos}></Route>
				<Route path="/acessorios" component={Acessorios}></Route>
				<Route exact path="/" component={Home}></Route>
				{/* Rotas a adicionar ainda -> login, cadastro, perfil, busca, e carrinho */}
			</Switch>
		</BrowserRouter>
	);
}
