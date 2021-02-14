const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./src/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const path = require('path');

require('./src/config/db/db');

const PORT = process.env.PORT || '5000';

const server = express();

const Logger = require('./src/services/logger_service');
const logger = new Logger('server');

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//lidando com a pasta de arquivos
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

server.use(routes);

server.listen(PORT, () => {
	logger.info(`Servidor Iniciado na Porta: ${PORT}`.bgBlue);
});
