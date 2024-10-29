// Importa o módulo 'fs' para operações de leitura e escrita de arquivos
const fs = require('fs');

// Define o nome do arquivo CSV a ser lido
const bancoCsv = 'database.csv';

// Lê o conteúdo do arquivo 'database.csv' como uma string de texto
const banco = fs.readFileSync(bancoCsv, "utf-8");

// Define uma expressão regular para encontrar números de telefone fixo no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
const regexTelefone = /\(\d{2}\)\s\d{4,5}-\d{4}/g;

// Usa a expressão regular para encontrar todos os números de telefone no conteúdo do arquivo
const matchTelefone = banco.match(regexTelefone);
console.log(matchTelefone); // Exibe todos os telefones fixos encontrados

// Define uma expressão regular para encontrar números de celular no formato (XX) XXXXX-XXXX
const patternCel = /\(\d{2}\)\s\d{5}-\d{4}/g;

// Usa a expressão regular para encontrar todos os números de celular no conteúdo do arquivo
const matchCelular = banco.match(patternCel);
console.log(matchCelular); // Exibe todos os celulares encontrados
