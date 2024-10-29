// Importa o módulo 'fs' para operações de leitura e escrita de arquivos
const fs = require('fs');

// Define o nome do arquivo CSV a ser lido
const bancoCsv = 'database.csv';

// Lê o conteúdo do arquivo 'database.csv' como uma string de texto
const banco = fs.readFileSync(bancoCsv, "utf-8");

// Define uma expressão regular para encontrar nomes compostos por uma ou mais palavras
const patternNomes = /^([A-Za-zÀ-ÿ]+)(\s[A-Za-zÀ-ÿ]+)+/gm;

// Usa a expressão regular para encontrar todos os nomes no conteúdo do arquivo
const matchNomes = banco.match(patternNomes);
console.log(`todos os nomes:`, matchNomes); // Exibe todos os nomes encontrados
