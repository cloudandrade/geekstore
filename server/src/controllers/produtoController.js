const Produto = require('../models/Produto');
const Categoria = require('../models/Categoria');
const Imagem = require('../models/Imagem');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const logger = new Logger('server');
const fs = require('fs');

//Buscar produtos
exports.list = async (req, res) => {
	logger.info('Route - Busca de Produtos');
	const orderBy = req.params.orderBy;
	let storedImageAddress;
	let bypass;
	let hashName;
	let formato;
	let buff;

	//fazendo um select com join trazendo somente alguns atributos de ambos os lados
	try {
		let payload = await Produto.findAll(
			{
				attributes: ['id', 'preco', 'descricao', 'nome', 'dataCriacao'],
				include: [
					{ model: Categoria, attributes: ['descricao'], as: 'categoria' },
					{ model: Imagem, attributes: ['base', 'formato'] },
				],
			},
			{
				type: QueryTypes.SELECT,
			}
		);

		payload.map((produto) => {
			produto = {
				id: produto.dataValues.id,
				preco: produto.dataValues.preco,
				descricao: produto.dataValues.descricao,
				nome: produto.dataValues.nome,
				categoria: produto.dataValues.categoria.dataValues,
				imagem: produto.dataValues.imagem.dataValues,
			};

			bypass = produto.imagem.base.split('/')[3].split('.');
			//	bypass = bypass[3].split('.');
			bypass = bypass[0];
			hashName = bypass;
			formato = produto.imagem.formato;
			storedImageAddress = `./src/images/${hashName}.${formato}`;
			buff = fs.readFileSync(storedImageAddress);
			produto.imagem.base = buff.toString('base64');
			return produto;
		});

		/* let payload = await sequelize.query(
			`select c.distancia, c.duracao, c.pace, c.data from corridas as c
			join usuario_corridas uc on 
			uc.usuario_id = ${usuarioId} 
			and
			uc.corrida_id = c.id`,
			{
				type: QueryTypes.SELECT,
			}
		); */
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar produtos';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
		throw Error(error);
	}
};
