import React from 'react';
import ProdutoCard from '../../components/ProdutoCard/index';
import './styles.css';

// import { Container } from './styles';

function Camisas() {
	return (
		<div className="main">
			<h1>Camisas</h1>
			<br />
			<div className="card">
				<ProdutoCard />
			</div>
		</div>
	);
}

export default Camisas;
