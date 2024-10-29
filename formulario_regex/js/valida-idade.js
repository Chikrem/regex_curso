// Função principal que verifica se o usuário é maior de idade
export default function ehMaiorDeIdade(campo) {
    // Converte o valor do campo (data de nascimento) em um objeto Date
    const dataNascimento = new Date(campo.value);

    // Verifica se a idade é válida usando a função auxiliar validaIdade
    if (!validaIdade(dataNascimento)) {
        // Define uma mensagem de erro personalizada se o usuário não for maior de idade
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

// Função auxiliar que valida se a data representa alguém com 18 anos ou mais
function validaIdade(data) {
    // Cria um objeto Date representando a data atual
    const dataAtual = new Date();

    // Cria uma data equivalente a 18 anos após a data de nascimento
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    // Retorna verdadeiro se a data atual é maior ou igual a dataMais18
    return dataAtual >= dataMais18;
}
