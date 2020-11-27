const db = require('../config/db/db');
const { STRING, INTEGER, DATE } = require('sequelize');
const Categoria = require('./Categoria');
const Imagem = require('./Imagem');

var Produto = db.sequelize.define(
	'produto',
	{
		preco: {
			type: INTEGER,
			required: true,
		},
		descricao: {
			type: STRING,
			required: true,
		},
		nome: {
			type: STRING,
			required: true,
		},
		dataCriacao: {
			type: DATE,
		},
		categoria_id: {
			type: INTEGER,
			required: true,
		},
		imagem_id: {
			type: INTEGER,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Produto',
		tableName: 'produto',
	}
);

//criando relacionamento e nomeando um apelido para o retorno desse relacionamento
Produto.belongsTo(Categoria, {
	foreignKey: 'categoria_id',
	as: 'categoria',
});

Produto.belongsTo(Imagem, {
	foreignKey: 'imagem_id',
});

/*Produto.sync({
    force: true
})*/
module.exports = Produto;
