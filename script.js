// Declarando variáveis globais
let alunos = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo aluno
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo aluno
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar aluno por matricula
function identifica(matricula) {
    for (let aluno of alunos) {
        if (aluno.matricula === matricula.id) {
            return aluno;
        }
    }
    return null;
}

function modal(button) {
    let aluno = identifica(button);

    let modalElement = document.getElementById("myModal"); // Renomeei a variável para evitar conflito

    if (!modalElement) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modalElement.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do aluno
    let nomeModal = modalElement.querySelector("#nomeModal");
    let dataModal = modalElement.querySelector("#dataModal");
    let matriculaModal = modalElement.querySelector("#matriculaModal");
    let turmaModal = modalElement.querySelector("#turmaModal");
    let cursoModal = modalElement.querySelector("#cursoModal");
    let btnExcluirAluno = modalElement.querySelector("#btnExcluirAluno");

    if (!nomeModal || !dataModal || !matriculaModal || !turmaModal || !cursoModal || !btnExcluirAluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    nomeModal.innerHTML = aluno.nome;
    dataModal.innerHTML = aluno.data;
    matriculaModal.innerHTML = aluno.matricula;
    turmaModal.innerHTML = aluno.turma;
    cursoModal.innerHTML = aluno.curso;

    // Configurando o botão de excluir
    btnExcluirAluno.onclick = function () {
        excluirAluno(aluno.matricula);
        modalElement.style.display = "none";
    };

    span.onclick = function () {
        modalElement.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalElement) {
            modalElement.style.display = "none";
        }
    };

    modalElement.style.display = "block";
}

// Função para excluir aluno
function excluirAluno(matricula) {
    alunos = alunos.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("info");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoId = `<td><button id='${aluno.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.data}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.turma}</td>
            <td>${aluno.curso}</td>
            ${botaoId}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo aluno
function cadastrarAluno() {
    let nome = document.getElementById("nome").value;
    let data = document.getElementById("data").value;
    let matricula = document.getElementById("matricula").value;
    let turma = document.getElementById("turma").value;
    let curso = document.getElementById("curso").value;

    let novoAluno = {
        nome: nome,
        data: data,
        matricula: matricula,
        turma: turma,
        curso: curso
    };
    

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(novoAluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Recarrega a tabela após cadastrar um novo aluno
    carrega();

    // Esconde o modal de novo aluno
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o aluno já existe
function alunoExistente(matricula) {
    return alunos.some(aluno => aluno.matricula === matricula);
}