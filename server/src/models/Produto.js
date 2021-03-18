const db = require('../config/db/db');
const { STRING, INTEGER, DECIMAL, DATE } = require('sequelize');
const Categoria = require('./Categoria');

var Produto = db.sequelize.define(
	'produto',
	{
		preco: {
			type: DECIMAL,
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

/*Produto.sync({
    force: true
})*/
module.exports = Produto;
