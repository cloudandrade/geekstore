const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Categoria = db.sequelize.define(
	'categoria',
	{
		descricao: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Categoria',
		tableName: 'categoria',
	}
);

/*Categoria.sync({
    force: true
})*/
module.exports = Categoria;
