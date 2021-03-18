import React from 'react';
import ProdutoCard from '../../components/ProdutoCard/index';
import './styles.css';

import history from 'browser-history';
import navigator from '../../services/navigator';

// import { Container } from './styles';

function Camisas() {
	function handleClickProduto() {
		let id = 5;
		let url = `/`;
		history('/copos');
	}

	return (
		<div className="main">
			<h1>Camisas</h1>
			<br />
			<div className="card">
				<ProdutoCard
					title={'Lagartão'}
					image={
						'https://t2.uc.ltmcdn.com/pt/images/6/5/7/img_como_fazer_uma_armadilha_para_lagartos_21756_orig.jpg'
					}
					onClick={() => handleClickProduto()}
					price={'11,50'}
				/>
			</div>
		</div>
	);
}

export default Camisas;
