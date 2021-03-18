const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const Imagem = require('../models/Imagem');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const logger = new Logger('server');
const fs = require('fs');

exports.index = async (req, res) => {
	logger.info('Route - Busca de Produto por Id');
	const id = req.params.id;

	await Produto.findOne({ where: { id: id } }).then((produto) => {
		console.log(produto);
		res.send(produto);
	});
};

//Buscar produtos
exports.list = async (req, res) => {
	logger.info('Route - Busca de Produtos');

	var payload = await sequelize.query(
		`select 
		s.id, 
			s.nome,
			s.descricao,
			s.dataCriacao,
			s.preco,
			c.descricao as categoria,
			i.id as imagemId,
			i.nome as imagemNome,
			i.formato as imagemFormato,
			i.isPrincipal,
			i.isEstampa
	 from produto s 
	 join imagem i 
		on s.id = i.produto_id
	join categoria c on s.categoria_id = c.id`,
		{
			type: QueryTypes.SELECT,
		}
	);

	res.send(payload);
};

exports.create = async (req, res) => {
	logger.info('Route - Criação de Produto');
	const nome = req.body.nome;
	const descricao = req.body.descricao;
	const preco = req.body.preco;
	const categoria = req.body.categoria_id;

	if (!nome) {
		res.status(400).send('O campo nome não pode ficar vazio');
	} else if (!descricao) {
		res.status(400).send('O campo descrição não pode ficar vazio');
	} else if (!preco) {
		res.status(400).send('O campo preço não pode ficar vazio');
	} else if (!categoria) {
		res.status(400).send('O campo categoria não pode ficar vazio');
	}

	let newProduto = {
		nome: nome,
		descricao: descricao,
		preco: preco,
		dataCriacao: Date.now(),
		categoria_id: categoria,
	};

	console.log(newProduto);
	let payload = null;
	try {
		payload = await Produto.create(newProduto);
		response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		payloadError =
			'falha ao cadastrar produto // PAYLOAD: ' + payload + ' // ERROR: ' + error;
		logger.error(payloadError);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};
