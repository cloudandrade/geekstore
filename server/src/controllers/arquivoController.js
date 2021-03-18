const Imagem = require('../models/Imagem');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const logger = new Logger('server');

exports.create = async (req, res) => {
	logger.info('Route - Criação de Imagem do Produto');
	const arquivo = req.file;
	const isPrincipal = req.body.isPrincipal;
	const isEstampa = req.body.isEstampa;
	const produtoId = req.body.produtoId;
	var armazena = true;

	if (isPrincipal === null || isEstampa === null || produtoId === null) {
		res.status(400).send(
			'Os campos principal, estampa e produtoId não podem ser nulos'
		);
	}

	if (arquivo === null) {
		res.status(400).send(
			'não pôde ser encontrado o arquivo para incluir, o arquivo deve ser enviado'
		);
	}

	if (armazena === true) {
		let payload = null;

		var imagem = {
			nome: arquivo.filename,
			formato: arquivo.mimetype,
			isPrincipal: isPrincipal === 'true' ? 1 : 0,
			isEstampa: isEstampa === 'true' ? 1 : 0,
			produto_id: produtoId,
		};

		try {
			payload = await Imagem.create(imagem);
			response = { sucess: true, payload };
			return res.send(response);
		} catch (error) {
			payloadError =
				'falha ao inserir imagem // PAYLOAD: ' + payload + ' // ERROR: ' + error;
			logger.error(payloadError);
			let response = { sucess: false, payload };
			res.status(500).send(response);
		}
	}
};

exports.batchCreate = async (req, res) => {
	logger.info('Route - Criação de Imagens Secundárias do Produto');
	const arquivos = req.files;
	const isPrincipal = req.body.isPrincipal;
	const isEstampa = req.body.isEstampa;
	const produtoId = req.body.produtoId;

	try {
		let payload = [];
		await arquivos.forEach(async (a) => {
			var imagem = {
				nome: a.filename,
				formato: a.mimetype,
				isPrincipal: isPrincipal === 'true' ? 1 : 0,
				isEstampa: isEstampa === 'true' ? 1 : 0,
				produto_id: produtoId,
			};
			await Imagem.create(imagem);
		});

		var qtdArquivos = arquivos.length;
		var result = await Imagem.findAll({
			where: { produto_id: produtoId },
			order: ['id', 'DESC'],
		});
		console.log(result);
		console.log(qtdArquivos);
		for (var i = 0; i >= qtdArquivos; i++) {
			console.log(i);
		}

		response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		payloadError =
			'falha ao inserir imagem // PAYLOAD: ' + payload + ' // ERROR: ' + error;
		logger.error(payloadError);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};
