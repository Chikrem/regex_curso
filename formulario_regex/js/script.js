import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
import ehUmNome from "./valida-nome.js";

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');

formulario?.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }
    
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
  
    window.location.href = "./abrir-conta-form-2.html";
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

/**
 * An object containing validation messages for various form fields.
 * 
 * @property {Object} nome - Validation messages for the "nome" field.
 * @property {string} nome.valueMissing - Message when the "nome" field is empty.
 * @property {string} nome.patternMismatch - Message when the "nome" field does not match the required pattern.
 * @property {string} nome.tooShort - Message when the "nome" field is too short.
 * 
 * @property {Object} email - Validation messages for the "email" field.
 * @property {string} email.valueMissing - Message when the "email" field is empty.
 * @property {string} email.typeMismatch - Message when the "email" field is not a valid email.
 * @property {string} email.tooShort - Message when the "email" field is too short.
 * 
 * @property {Object} cpf - Validation messages for the "cpf" field.
 * @property {string} cpf.valueMissing - Message when the "cpf" field is empty.
 * @property {string} cpf.patternMismatch - Message when the "cpf" field does not match the required pattern.
 * @property {string} cpf.customError - Message when the "cpf" field contains a non-existent CPF.
 * @property {string} cpf.tooShort - Message when the "cpf" field is too short.
 * 
 * @property {Object} aniversario - Validation messages for the "aniversario" field.
 * @property {string} aniversario.valueMissing - Message when the "aniversario" field is empty.
 * @property {string} aniversario.customError - Message when the user is not older than 18 years.
 * 
 * @property {Object} termos - Validation messages for the "termos" field.
 * @property {string} termos.valueMissing - Message when the "termos" field is not accepted.
 */

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

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    if (campo.name === "nome" && campo.value != ""){
        ehUmNome(campo);
    }
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}