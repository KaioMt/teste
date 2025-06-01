// Recupera o ID do formulário selecionado pela URL
const urlParams = new URLSearchParams(window.location.search);
const formularioId = urlParams.get('id');

// Recupera os formulários salvos no localStorage
const formularios = JSON.parse(localStorage.getItem('formularios')) || [];

// Encontra o formulário selecionado
const formulario = formularios.find(f => f.id === formularioId);

const container = document.getElementById('respostas-container');

if (formulario) {
    const tituloForm = document.createElement('h2');
    tituloForm.textContent = `Formulário: ${formulario.nome}`;
    container.appendChild(tituloForm);

    formulario.perguntas.forEach(pergunta => {
        const perguntaDiv = document.createElement('div');
        perguntaDiv.classList.add('pergunta');

        const perguntaTitulo = document.createElement('h3');
        perguntaTitulo.textContent = `Pergunta: ${pergunta}`;
        perguntaDiv.appendChild(perguntaTitulo);

        // Respostas simuladas (mockadas)
        const respostasMock = gerarRespostasMock();

        respostasMock.forEach(resposta => {
            const respostaDiv = document.createElement('div');
            respostaDiv.classList.add('resposta');
            respostaDiv.textContent = resposta;
            perguntaDiv.appendChild(respostaDiv);
        });

        container.appendChild(perguntaDiv);
    });
} else {
    container.innerHTML = '<p>Formulário não encontrado.</p>';
}

// Função para gerar respostas mockadas
function gerarRespostasMock() {
    const exemplos = [
        "Muito bom!",
        "Precisa melhorar.",
        "Perfeito.",
        "Atendimento rápido.",
        "Recomendaria sim.",
        "Não gostei muito.",
        "Excelente serviço.",
        "Voltaria novamente."
    ];
    const quantidade = Math.floor(Math.random() * 4) + 2; // de 2 a 5 respostas
    const respostas = [];
    for (let i = 0; i < quantidade; i++) {
        const index = Math.floor(Math.random() * exemplos.length);
        respostas.push(`Resposta: ${exemplos[index]}`);
    }
    return respostas;
}