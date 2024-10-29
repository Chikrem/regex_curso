// Importa o módulo 'fs' para operações de leitura e escrita de arquivos
const fs = require('fs');

// Define o nome do arquivo CSV a ser lido
const bancoCsv = 'database.csv';

// Lê o conteúdo do arquivo 'database.csv' como uma string de texto
const banco = fs.readFileSync(bancoCsv, "utf-8");

// Define uma expressão regular para encontrar a string 'Anna'
const regex = /Anna/;

// Usa a expressão regular para encontrar a correspondência no conteúdo do arquivo
const matchRegex = banco.match(regex);

// Exibe a correspondência encontrada no console
console.log(matchRegex);
