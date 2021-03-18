const { Router } = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const os = require('os-utils');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const multerConfig = require('../config/storage/multer');

const Auth = require('../controllers/authController');
const { checkAuthorization } = require('../services/auth');
const usuarioC = require('../controllers/usuarioController');
const produtoC = require('../controllers/produtoController');
const arquivoC = require('../controllers/arquivoController');
const routes = Router();

//================================= SERVER

routes.get('/', async (req, res) => {
	function format(seconds) {
		function pad(s) {
			return (s < 10 ? '0' : '') + s;
		}
		var hours = Math.floor(seconds / (60 * 60));
		var minutes = Math.floor((seconds % (60 * 60)) / 60);
		var seconds = Math.floor(seconds % 60);
		return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
	}

	res.send({
		nomeApp: 'GeekStore Server',
		plataforma: platform(),
		horaAtual: dateTime(),
		tempoAtivoSys: uptime(),
		tempoAtivoApp: format(process.uptime()),
		cpu: await cpuUsage(),
		memoria: memoryUsage(),
	});
});

//============================================= USUARIOS
routes.post('/api/usuarios', usuarioC.create);
routes.get('/api/usuarios/:id', checkAuthorization, usuarioC.index);
routes.post('/api/auth', Auth.auth);
routes.get('/auth/verify', checkAuthorization, async (req, res) => {
	res.json({
		error: null,
		data: {
			message: 'Autorizado com sucesso',
		},
	});
});

//============================================= PRODUTOS
routes.get('/api/produtos', produtoC.list);
routes.get('/api/produtos/:id', produtoC.index);
routes.post('/api/produtos', produtoC.create);

//============================================= ARQUIVOS
routes.post('/api/arquivo/unico', multer(multerConfig).single('file'), arquivoC.create);
routes.post(
	'/api/arquivo/multi',
	multer(multerConfig).array('files'),
	arquivoC.batchCreate
);

routes.get('/api/arquivo', (req, res) => {
	console.log(process.cwd());

	fs.readFile(
		`${process.cwd()}/src/arquivos/imagens/03d2ec9e6c42a93055b8d563456fa18a-1_QaDoXxtLkRbmoyWNlbwdNA.jpeg`,
		(err, data) => {
			//error handle
			if (err) res.status(500).send(err);

			//get image file extension name
			let extensionName = path.extname(
				`${process.cwd()}/src/arquivos/imagens/03d2ec9e6c42a93055b8d563456fa18a-1_QaDoXxtLkRbmoyWNlbwdNA.jpeg`
			);

			//convert image file to base64-encoded string
			let base64Image = new Buffer(data, 'binary').toString('base64');

			//combine all strings
			let imgSrcString = `data:image/${extensionName
				.split('.')
				.pop()};base64,${base64Image}`;

			//send image src string into jade compiler
			res.send(imgSrcString);
		}
	);
});
//============================================= FUNCOES DO SISTEMA
function uptime() {
	const minutesTime = os.sysUptime() / 60 / 60;
	const hours = Math.floor(minutesTime);
	const minutes = (minutesTime - hours) * 60;
	return `${hours}h${Math.round(minutes)}m`;
}

function platform() {
	let plataforma = os.platform();
	switch (plataforma) {
		case 'win32':
			plataforma = 'windows';
			break;
		case 'darwin':
			plataforma = 'mac-os';
			break;
		case 'linux':
			plataforma = 'linux';
			break;
		default:
			break;
	}
	return plataforma;
}

function cpuUsage() {
	return new Promise((resolve) => {
		os.cpuUsage((v) => {
			let cpupercent = v.toString().split('.');
			cpupercent = cpupercent[1].substring(0, 2);
			resolve(`${cpupercent}%`);
		});
	});
}

function memoryUsage() {
	let freememory = os.freememPercentage().toString().split('.');
	freememory = freememory[1].substring(0, 2);
	const memoryUsage = 100 - freememory;
	return `${memoryUsage}%`;
}

function dateTime() {
	const dateTimeNow = new Date();
	return `${dateTimeNow.getHours()}h${dateTimeNow.getMinutes()}m${dateTimeNow.getSeconds()}s`;
}

module.exports = routes;
