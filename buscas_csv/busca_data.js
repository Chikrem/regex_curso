// Importa o módulo 'fs' para operações de leitura e escrita de arquivos
const fs = require('fs');

// Define o nome do arquivo CSV a ser lido
const bancoCsv = 'database.csv';

// Lê o conteúdo do arquivo 'database.csv' como uma string de texto
const banco = fs.readFileSync(bancoCsv, "utf-8");

// Define uma expressão regular para encontrar datas no formato DD/MM/AAAA, DD.MM.AAAA ou DD MM AAAA
const patternData = /\d{2}[./ ]?\d{2}[./ ]?\d{4}$/gm;

// Usa a expressão regular para encontrar todas as correspondências de datas no conteúdo do arquivo
const matchData = banco.match(patternData);

// Exibe as datas encontradas no console
console.log(matchData);
