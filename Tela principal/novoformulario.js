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
  
    const formularios = JSON.parse(localStorage.getItem('formularios')) || [];
  
    let novoCodigo = 1;
    if (formularios.length > 0) {
      const codigosExistentes = formularios
        .map(f => Number(f.codigo))
        .filter(codigo => !isNaN(codigo));
  
      if (codigosExistentes.length > 0) {
        novoCodigo = Math.max(...codigosExistentes) + 1;
      }
    }
  
    const novoFormulario = {
      titulo,
      perguntas,
      status: "Criado",
      codigo: novoCodigo
    };
  
    formularios.push(novoFormulario);
    localStorage.setItem('formularios', JSON.stringify(formularios));
  
    window.location.href = 'formulario.html';
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
  