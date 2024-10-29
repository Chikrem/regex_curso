// Exporta a função como um módulo padrão para que possa ser importada em outros arquivos
export default function ehUmNome(campo) {
    // Obtém o valor do campo (input) passado como argumento
    const nome = campo.value;

    // Define uma expressão regular para validar o nome
    // A regex faz as seguintes verificações:
    // ^                 : Início da string
    // (?!(.)\1\1)      : Verifica que não há três letras iguais consecutivas
    // [A-Za-zÀ-ÿ -]    : Permite letras (incluindo acentuadas), espaços e hífens
    // {3,30}           : O comprimento do nome deve ser entre 3 e 30 caracteres
    // $                 : Fim da string
    // i                 : Ignora maiúsculas e minúsculas
    const patternNome = /^(?!(.)\1\1)[A-Za-zÀ-ÿ -]{3,30}$/i.test(nome);
    
    // Exibe no console o resultado do teste (true ou false)
    console.log(patternNome);

    // Se o nome não passar na validação
    if (!patternNome) {
        // Define uma mensagem de erro personalizada para o campo
        campo.setCustomValidity('Não é um nome válido');
        
        // Exibe uma mensagem no console informando que o nome não é válido
        console.log(`"${nome}" não é um nome válido`);
    }

    // Retorna o valor do nome
    return nome;
}
