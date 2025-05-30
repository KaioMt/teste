const token = localStorage.getItem('authToken');
if (!token) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "../index.html"; 
}

function salvarFormulario() {
  const tituloInput = document.getElementById('titulo');
  const perguntasContainer = document.getElementById('perguntas-container');

  const titulo = tituloInput.value.trim();
  const perguntas = Array.from(perguntasContainer.querySelectorAll('input[type="text"]'))
    .map(input => input.value.trim())
    .filter(texto => texto !== "");

  if (!titulo) {
    alert('Por favor, preencha o título do formulário.');
    return;
  }

  if (perguntas.length === 0) {
    alert('Por favor, adicione pelo menos uma pergunta ao formulário.');
    return;
  }


  axios.post(
    'http://localhost:3000/user/novo-form',
    { titulo },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    }
  ).then(response => {
    const Id = response.data.id;
    console.log("Formulário " + Id);
    let promises = perguntas.map(Pergunta => {
      let Documento = {
        pergunta: Pergunta,
        status: 0
      };
      console.log(Documento);
      return axios.post(
        `http://localhost:3000/pergunta/novo-pergunta/${Id}`,
        Documento,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
    });

     Promise.all(promises)
      .then(responses => {
        alert("Perguntas cadastradas com sucesso!");
        window.location.href = "main.html";
      })
      .catch(error => {
        console.error("Erro ao cadastrar as perguntas:", error);
        alert("Erro ao cadastrar as perguntas.");
      });

  }).catch(error => {
    console.error("Erro ao enviar o formulário:", error);
    alert("Erro ao criar o formulário. Tente novamente.");
  });
}


  function confirmarCancelamento() {
    const titulo = document.getElementById('titulo').value.trim();
    const perguntasInputs = document.querySelectorAll('#perguntas-container input[type="text"]');

    let perguntasPreenchidas = false;
    perguntasInputs.forEach(input => {
      if (input.value.trim() !== '') {
        perguntasPreenchidas = true;
      }
    });

    if (titulo !== '' || perguntasPreenchidas) {
      abrirModal();
    } else {
      window.location.href = 'formulario.html';
    }
  }

  function abrirModal() {
    const modal = document.getElementById('modal-cancelar');
    modal.style.display = 'flex';
  }

  function fecharModal() {
    const modal = document.getElementById('modal-cancelar');
    modal.style.display = 'none';
  }

  function confirmarSaida() {
    window.location.href = 'formulario.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btnSalvar = document.querySelector('.btn-salvar');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const btnConfirmarSaida = document.querySelector('.btn-confirmar-saida');
    const btnFecharModal = document.querySelector('.btn-fechar-modal');

    if (btnSalvar) {
      btnSalvar.addEventListener('click', (e) => {
        e.preventDefault();
        salvarFormulario();
      });
    }

    if (btnCancelar) {
      btnCancelar.addEventListener('click', (e) => {
        e.preventDefault();
        confirmarCancelamento();
      });
    }

    if (btnConfirmarSaida) {
      btnConfirmarSaida.addEventListener('click', confirmarSaida);
    }

    if (btnFecharModal) {
      btnFecharModal.addEventListener('click', fecharModal);
    }
  });
