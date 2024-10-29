// Remove a pontuação de um CPF, eliminando pontos e traços
function removePontuacao(campo) {
    // Substitui '.' e '-' por uma string vazia
    return campo.value.replace(/\.|-/g, "");
}

// Verifica se todos os dígitos de um CPF são iguais
function todosDigitosIguais(cpf) {
    // ^(\d)\1{10}$: Verifica se o CPF é composto por um único dígito repetido 11 vezes (padrão inválido)
    return /^(\d)\1{10}$/.test(cpf);
}

// Calcula o dígito verificador de um CPF
function calculaDigitoVerificador(cpf, multiplicadorInicial) {
    let soma = 0;
    let multiplicador = multiplicadorInicial;

    // Laço que soma o produto dos dígitos do CPF pelo multiplicador
    for (let tamanho = 0; tamanho < 9 + multiplicadorInicial; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--; // Decrementa o multiplicador a cada iteração
    }

    // Calcula o resto da divisão por 11
    let resto = soma % 11;

    // Determina o dígito verificador com base no resto
    if (resto < 2) {
        // Retorna verdadeiro se o dígito esperado é 0
        return cpf[9 + multiplicadorInicial] === 0;
    } else {
        // Retorna verdadeiro se o dígito esperado for 11 - resto
        return cpf[9 + multiplicadorInicial] === 11 - resto;
    }
}

// Função principal para validar o CPF
export default function ehUmCPF(campo) {
    // Remove pontos e traços do CPF
    const cpfSemPontuacao = removePontuacao(campo);
    
    // Verifica se o CPF é inválido por várias razões
    if (
        todosDigitosIguais(cpfSemPontuacao) ||           // CPF com todos os dígitos iguais é inválido
        calculaDigitoVerificador(cpfSemPontuacao, 10) || // Primeiro dígito verificador incorreto
        calculaDigitoVerificador(cpfSemPontuacao, 11) || // Segundo dígito verificador incorreto
        cpfSemPontuacao.match(/[A-Za-zÀ-ÿ]+/)           // CPF contém letras ou caracteres especiais
    ) {
        // Exibe logs no console para depuração
        console.log("Dígitos iguais:", todosDigitosIguais(cpfSemPontuacao));
        console.log("CPF sem pontuação:", cpfSemPontuacao);
        
        // Define uma mensagem de erro personalizada
        campo.setCustomValidity('Esse CPF não é válido');
    }
}
