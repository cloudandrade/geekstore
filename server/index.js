const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./src/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

require('./src/config/db/db');

const PORT = process.env.PORT || '5000';

const server = express();

const Logger = require('./src/services/logger_service');
const logger = new Logger('server');

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Geekstore API',
			description: 'Geekstore API Endpoints Docs',
			servers: ['http://localhost:5000'],
			tags: [
				{
					name: 'geral',
					description: 'Everything about your runners aplication',
				},
				{
					name: 'usuarios',
					description: 'Everything about your agents',
				},
			],
		},
	},
	//['.routes/*.js]
	apis: ['./src/routes/*.js'],
};

//Routes

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(routes);

server.listen(PORT, () => {
	logger.info(`Servidor Iniciado na Porta: ${PORT}`.bgBlue);
});
