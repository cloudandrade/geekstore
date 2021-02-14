const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Usuario = db.sequelize.define(
	'usuario',
	{
		nome: {
			type: STRING,
			required: true,
		},
		email: {
			type: STRING,
			required: true,
		},
		senha: {
			type: STRING,
			required: true,
		},
		perfil_id: {
			type: INTEGER,
			required: true,
		},
		telefone: {
			type: INTEGER,
			required: true,
		},
		endereco: {
			type: STRING,
			required: true,
		},
		numero: {
			type: INTEGER,
			required: true,
		},
		bairro: {
			type: STRING,
			required: true,
		},
		cep: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Usuario',
		tableName: 'usuario',
	}
);

/*Usuario.sync({
    force: true
})*/
module.exports = Usuario;
