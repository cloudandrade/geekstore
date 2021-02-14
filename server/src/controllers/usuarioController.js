const Usuario = require('../models/Usuario');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const bcrypt = require('bcryptjs');
const logger = new Logger('server');

//criar
exports.create = async (req, res) => {
	logger.info('Route - Criação de Usuário');
	let newUsuario = {
		nome: req.body.nome,
		email: req.body.email,
		senha: bcrypt.hashSync(req.body.senha, 8),
		perfil_id: req.body.perfil,
		telefone: req.body.telefone,
		endereco: req.body.endereco,
		numero: req.body.numero,
		bairro: req.body.bairro,
		cep: req.body.cep,
	};

	if (!newUsuario.nome) {
		res.status(400).send('O campo nome não pode ficar vazio');
	} else if (!newUsuario.email) {
		res.status(400).send('O campo email não pode ficar vazio');
	} else if (!newUsuario.senha) {
		res.status(400).send('O campo senha não pode ficar vazio');
	} else if (!newUsuario.bairro) {
		res.status(400).send('O campo bairro não pode ficar vazio');
	} else if (!newUsuario.telefone) {
		res.status(400).send('O campo telefone não pode ficar vazio');
	} else if (!newUsuario.cep) {
		res.status(400).send('O campo cep não pode ficar vazio');
	} else if (!newUsuario.endereco) {
		res.status(400).send('O campo endereço não pode ficar vazio');
	}

	console.log(newUsuario);
	console.log(newUsuario.senha);
	let payload = null;
	try {
		payload = await Usuario.create(newUsuario);
		response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		payloadError =
			'falha ao cadastrar usuário // PAYLOAD: ' + payload + ' // ERROR: ' + error;
		logger.error(payloadError);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

//buscar usuario detalhado por id
exports.index = async (req, res) => {
	logger.info('Route - Detalhes de Usuário');
	const id = req.params.id;

	try {
		let payload = await sequelize.query(
			`SELECT 
					u.id, 
					u.nome, 
					u.email, 
					u.telefone,  
					u.endereco, 
					u.numero, 
					u.bairro, 
					u.cep,
			CASE 
				WHEN u.perfil_id = 1 THEN 'Administrador'
			ELSE 'Comprador'
			END AS perfil
			FROM 
				usuario u
			WHERE u.id = ${id}`,
			{
				type: QueryTypes.SELECT,
			}
		);
		let response = { sucess: true, payload };
		console.log(response);

		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar usuário por id';
		logger.error(payload, error);
		throw Error(error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};
