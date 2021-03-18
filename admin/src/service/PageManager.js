import React from 'react';

import Home from '../pages/Home/index';
import Produtos from '../pages/Produtos/index';
import Usuarios from '../pages/Usuarios/index';

// import { Container } from './styles';

function service() {
	var url = window.location.pathname;
	return (
		<>
			{
				{
					'/': <Home />,
					'/produtos': <Produtos />,
					'/usuarios': <Usuarios />,
				}[url]
			}
		</>
	);
}

export default service;
