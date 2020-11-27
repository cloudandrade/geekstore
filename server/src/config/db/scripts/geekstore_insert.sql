-- inserindo perfis
INSERT INTO
  perfil (id, tipo)
VALUES
  ('1', 'Administrador');

INSERT INTO
  perfil (id, tipo)
VALUES
  ('2', 'Comprador');

-- inserindo categorias
INSERT INTO
  categoria (id, descricao)
VALUES
  ('1', 'Camisas');

INSERT INTO
  categoria (id, descricao)
VALUES
  ('2', 'Copos');

INSERT INTO
  categoria (id, descricao)
VALUES
  ('3', 'Acessórios');

INSERT INTO
  categoria (id, descricao)
VALUES
  ('4', 'Outros');

-- inserindo em status 
INSERT INTO
  status (id, descricao)
VALUES
  ('1', 'Em andamento');

INSERT INTO
  status (id, descricao)
VALUES
  ('2', 'Em validação');

INSERT INTO
  status (id, descricao)
VALUES
  ('3', 'Concluida');

INSERT INTO
  status (id, descricao)
VALUES
  ('4', 'Cancelada');

-- inserindo usuario admin
-- senha: adminrunapp
/* INSERT INTO
 usuario (
 id,
 perfil_id,
 nome,
 email,
 senha,
 level,
 dificuldade_id
 )
 VALUES
 (
 1,
 1,
 'Administrador',
 'admin@runapp.com',
 '$2a$08$sCOnIxe5X.fbWtMWCGylW.zAyFGspND2BDZTqtJ9zoUeEb/DQIJCK',
 999,
 4
 ); */
--inserindo produtos e imagens dos respectivos exemplo
-- camisa
insert into
  imagem (id, base, formato)
values
  (
    1,
    './src/images/fynwqblhb.jpg',
    'png'
  );

INSERT INTO
  produto (
    id,
    nome,
    descricao,
    dataCriacao,
    preco,
    categoria_id,
    imagem_id
  )
VALUES
  (
    1,
    'Camisa Naruto Shippuden',
    'Naruto e Kurama unidos no modo kurama',
    curdate(),
    5000,
    1,
    1
  );

-- caneca
insert into
  imagem (id, base, formato)
values
  (
    2,
    './src/images/oqhdw.jpg',
    'jpg'
  );

INSERT INTO
  produto (
    id,
    nome,
    descricao,
    dataCriacao,
    preco,
    categoria_id,
    imagem_id
  )
VALUES
  (
    2,
    'Caneca Batman Vs Coringa',
    'Caneca em estampa auto relevo, contendo o rosto do batman e do coringa, 450ml',
    curdate(),
    3000,
    2,
    2
  );

-- copo 
insert into
  imagem (id, base, formato)
values
  (
    3,
    './src/images/qypdo.jpg',
    'jpg'
  );

INSERT INTO
  produto (
    id,
    nome,
    descricao,
    dataCriacao,
    preco,
    categoria_id,
    imagem_id
  )
VALUES
  (
    3,
    'Copo rotável Goku e Vegeta',
    'Copo rotável Goku e Vegeta, alterne os cabelos deles entre normal e super sayajin, 500 ml',
    curdate(),
    3000,
    2,
    3
  );

-- acessorio
insert into
  imagem (id, base, formato)
values
  (
    4,
    './src/images/jyinuvivr.jpg',
    'jpg'
  );

INSERT INTO
  produto (
    id,
    nome,
    descricao,
    dataCriacao,
    preco,
    categoria_id,
    imagem_id
  )
VALUES
  (
    4,
    'Colar Pingente One Piece - Chapéu de Palha',
    'Colar com pingente de chapéu de palha do Luffy',
    curdate(),
    2000,
    3,
    4
  );

-- select produtos
SELECT
  p.id,
  p.nome,
  p.descricao,
  p.dataCriacao,
  p.preco,
  c.descricao AS 'categoria',
  i.base AS 'hashImagem',
  i.formato as 'formatoImagem'
FROM
  produto p
  JOIN categoria c ON p.categoria_id = c.id
  JOIN imagem i ON p.imagem_id = i.id;