import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import MaterialTable from 'material-table';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import tableIcons from './TableIcons.js';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const columns = [
	{ title: 'Id', field: 'id' },
	{ title: 'Nome', field: 'nome' },
	{ title: 'Descrição', field: 'descricao' },
	{ title: 'Preço', field: 'preco' },
	{ title: 'Categoria', field: 'categoria' },
	{ title: 'Opções', field: 'opcoes' },
];

function TableList({ colunas, dados, titulo, addAction, options }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (dados !== null) {
			setData(dados);
		} else {
			setData([]);
		}
	}, []);

	function handleAdd() {
		alert('Teste de Botão');
	}

	return (
		<MaterialTable
			style={{
				width: '100%',
				backgroundColor: '#FFF',
				display: 'block',
				textAlign: 'center',
			}}
			options={{
				search: false,
				toolbar: true,
				headerStyle: {
					backgroundColor: '#F0F0F0',
				},
				rowStyle: {
					backgroundColor: '#F8F8F8',
				},
			}}
			data={data}
			columns={colunas ? colunas : columns}
			title={titulo ? titulo : 'Tabela com conteúdo teste'}
			icons={tableIcons}
			actions={[
				{
					icon: AddCircleOutlineIcon,
					tooltip: 'Adicionar Novo',
					isFreeAction: true,
					hidden: addAction ? false : true,
					onClick: addAction,
				},
			]}
		/>
	);
}

export default TableList;
