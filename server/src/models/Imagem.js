const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Imagem = db.sequelize.define(
	'imagem',
	{
		nome: {
			type: STRING,
			required: true,
		},
		formato: {
			type: STRING,
			required: true,
		},
		isPrincipal: {
			type: INTEGER,
			required: true,
		},
		isEstampa: {
			type: INTEGER,
			required: true,
		},
		produto_id: {
			type: INTEGER,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Imagem',
		tableName: 'imagem',
	}
);

/*Categoria.sync({
    force: true
})*/
module.exports = Imagem;
