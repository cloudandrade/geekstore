CREATE SCHEMA `geekstore`;

USE `geekstore`;

CREATE TABLE `produto` (
	`id` int NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`dataCriacao` DATE NOT NULL,
	`preco` INT NOT NULL,
	`categoria_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `categoria` (
	`id` int NOT NULL,
	`descricao` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `usuario` (
	`id` int NOT NULL AUTO_INCREMENT,
	`perfil_id` int NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`telefone` varchar(11) NOT NULL,
	`endereco` varchar(255) NOT NULL,
	`numero` int NOT NULL,
	`bairro` varchar(255) NOT NULL,
	`cep` varchar(9) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `perfil` (
	`id` int NOT NULL,
	`tipo` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `carrinho` (
	`id` int NOT NULL AUTO_INCREMENT,
	`usuario_id` int NOT NULL,
	`produto_id` int NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `image` (
	`id` int NOT NULL AUTO_INCREMENT,
	`nome` varchar(255) NOT NULL,
	`formato` varchar(10) NOT NULL,
	`isPrincipal` int NOT NULL,
	`isEstampa` int NOT NULL,
	`produto_id` int NOT NULL,
	PRIMARY KEY (`id`)
);


