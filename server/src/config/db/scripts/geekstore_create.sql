CREATE SCHEMA `geekstore`;

USE `geekstore`;

CREATE TABLE `produto` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `dataCriacao` DATE NOT NULL,
  `preco` INT NOT NULL,
  `categoria_id` bigint NOT NULL,
  `imagem_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `imagem` (
  `id` int NOT NULL,
  `base` varchar(250) NOT NULL,
  `formato` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `perfil_id` int NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `tipo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `status` (
  `id` bigint NOT NULL,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `carrinho` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `produto_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `transacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `produto_id` bigint NOT NULL,
  `quantidade` INT NOT NULL,
  `valortotal` INT NOT NULL,
  `status_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
);