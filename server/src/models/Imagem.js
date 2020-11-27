const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Imagem = db.sequelize.define(
	'imagem',
	{
		descricao: {
			type: STRING,
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
