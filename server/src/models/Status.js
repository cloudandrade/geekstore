const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Status = db.sequelize.define(
	'status',
	{
		descricao: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Status',
		tableName: 'Status',
	}
);

/*Status.sync({
    force: true
})*/
module.exports = Status;
