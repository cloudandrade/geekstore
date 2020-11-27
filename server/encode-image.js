'use strict';

//converter texto para base64
console.log('encode to base64 process');
let data = 'stackabuse.com';
let buff = new Buffer(data);
let base64data = buff.toString('base64');

console.log('"' + data + '" converted to Base64 is "' + base64data + '"');

//converter  base64 para texto
console.log('decode from base64 process');
buff = new Buffer(base64data, 'base64');
let text = buff.toString('ascii');

//console.log('"' + base64data + '" converted from Base64 to ASCII is "' + text + '"');

//converter binario para base64

const fs = require('fs');
const path = require('path');

//simulando imagem enviada pelo frontend
buff = fs.readFileSync('colarchapeu.jpg');
base64data = buff.toString('base64');

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ENVIAR IMAGEM PARA O BACKEND
//no front irá enviar um base64
//será criado um nome artificial para a imagem que será atrelada ao produto
let hashName = Math.random()
	.toString(36)
	.replace(/[^a-z]+/g, '')
	.substr(0, 10);
console.log(hashName);

//o arquivo será armazenado de acordo com o nome gerado, e formato enviado

//converter base64 para binario e transformar em arquivo de imagem
data = base64data;
buff = new Buffer(data, 'base64');
fs.writeFileSync(`./src/images/${hashName}.jpg`, buff);

//o local armazenado será enviado ao banco junto com o nome do arquivo para consulta

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Buscar a imagem e enviar ao front
//será lida a imagem cujo endereço foi armazenado no banco de dados
let storedImageAddress = `./src/images/${hashName}.jpg`;
//a imagem entao é convertida em base64 e enviada na requisição
/* buff = fs.readFileSync(storedImageAdress);
base64data = buff.toString('base64');  */
console.log(storedImageAddress);
