// Importa o módulo 'fs' para operações de leitura e escrita de arquivos
const fs = require('fs');

// Define o nome do arquivo CSV a ser lido
const bancoCsv = 'database.csv';

// Lê o conteúdo do arquivo 'database.csv' como uma string de texto
const banco = fs.readFileSync(bancoCsv, "utf-8");

// Define uma expressão regular para encontrar números de CPF no formato XXX.XXX.XXX-XX, XXX-XXX-XXX.XX ou XXXXXXXXXXX
const patternCPF = /\d{3}[.-]?\d{3}[.-]?\d{3}[.-]?\d{2}/g;

// Usa a expressão regular para encontrar todas as correspondências de CPF no conteúdo do arquivo
const matchCPF = banco.match(patternCPF);

// Exibe os CPFs encontrados no console
console.log(matchCPF);
