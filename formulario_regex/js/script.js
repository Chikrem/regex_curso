// Importa funções de validação de CPF, idade e nome de outros módulos
import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
import ehUmNome from "./valida-nome.js";

// Seleciona todos os campos do formulário que são obrigatórios (required)
const camposDoFormulario = document.querySelectorAll('[required]');
// Seleciona o formulário específico usando um atributo de dados
const formulario = document.querySelector('[data-formulario]');

// Adiciona um listener para o evento de submit do formulário
formulario?.addEventListener("submit", (e) => {
    // Impede o comportamento padrão do envio do formulário
    e.preventDefault();

    // Cria um objeto com os valores dos campos do formulário
    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }
    
    // Armazena as respostas no localStorage como uma string JSON
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
  
    // Redireciona o usuário para a próxima página do formulário
    window.location.href = "./abrir-conta-form-2.html";
})

// Para cada campo do formulário, adiciona listeners para eventos de 'blur' e 'invalid'
camposDoFormulario.forEach((campo) => {
    // Verifica o campo ao perder o foco
    campo.addEventListener("blur", () => verificaCampo(campo));
    // Impede a exibição de mensagens padrão de validação do navegador
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

// Define os tipos de erro que podem ser verificados
const tiposDeErro = [
    'valueMissing',    // Campo vazio
    'typeMismatch',    // Tipo de dado incompatível (ex: e-mail)
    'patternMismatch',  // Não corresponde ao padrão definido
    'tooShort',        // Campo muito curto
    'customError'      // Erro personalizado
];

// Mensagens de erro personalizadas para cada campo
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

// Função que verifica cada campo do formulário
function verificaCampo(campo) {
    let mensagem = ""; // Inicializa a mensagem de erro
    campo.setCustomValidity(''); // Limpa mensagens de erro personalizadas

    // Verifica se o campo é o nome e se não está vazio
    if (campo.name === "nome" && campo.value != "") {
        ehUmNome(campo); // Chama a função de validação do nome
    }
    // Verifica se o campo é o CPF e se possui pelo menos 11 caracteres
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo); // Chama a função de validação do CPF
    }
    // Verifica se o campo é a data de aniversário e se não está vazio
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo); // Chama a função de validação da idade
    }

    // Para cada tipo de erro, verifica se o campo apresenta esse erro
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]; // Armazena a mensagem correspondente ao erro
            console.log(mensagem); // Exibe a mensagem no console
        }
    })
    
    // Seleciona o elemento que exibirá a mensagem de erro
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity(); // Verifica a validade do campo

    // Se o campo não for válido, exibe a mensagem de erro; caso contrário, limpa a mensagem
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem; // Exibe a mensagem de erro
    } else {
        mensagemErro.textContent = ""; // Limpa a mensagem de erro
    }
}
