import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getAllProdutos } from '../../service/requests';

import TableList from '../../components/TableList/index';

function Produtos() {
	const [produtos, setProdutos] = useState([]);

	const columns = [
		{ title: 'Id', field: 'id' },
		{ title: 'Nome', field: 'nome' },
		{ title: 'Descrição', field: 'descricao' },
		{ title: 'Preço', field: 'preco' },
		{ title: 'Categoria', field: 'categoria' },
		{ title: 'Opções', field: 'opcoes' },
	];

	function handleAdd() {
		alert('Teste de Botão');
	}

	useEffect(async () => {
		let dados = [];
		await getAllProdutos().then((res) => {
			console.log('Requisicao');
			console.log(res);
			res.data.forEach((item) => {
				var produto = {
					id: item.id,
					nome: item.nome,
					descricao: item.descricao,
					preco: item.preco,
					categoria: item.categoria,
					opcoes: null,
				};
				dados.push(produto);
			});

			setProdutos(dados);
		});
	}, []);

	return (
		<TableList
			titulo={'Produtos'}
			colunas={columns}
			dados={produtos}
			addAction={() => handleAdd()}
		/>
	);
}

export default Produtos;
