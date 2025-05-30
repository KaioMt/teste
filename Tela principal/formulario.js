window.addEventListener('DOMContentLoaded', () => {
  const lista = document.querySelector('.lista-forms');
  const formularios = JSON.parse(localStorage.getItem('formularios')) || [];

  formularios.forEach(form => {
    const div = document.createElement('div');
    div.classList.add('formcriado');

    div.innerHTML = `
      <div>
        <strong>TÍTULO: ${form.titulo}</strong><br>
        STATUS: ${form.status}
      </div>
      <div class="codigo">${form.codigo}</div>
    `;

    // 👉 Torna clicável
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      // Ao clicar, redireciona para a tela desejada passando o código na URL
      window.location.href = `listagemformulario.html?codigo=${form.codigo}`;
    });

    lista.appendChild(div);
  });
});

function atualizarStatus(codigo, novoStatus) {
  const formularios = JSON.parse(localStorage.getItem('formularios')) || [];

  const index = formularios.findIndex(f => f.codigo == codigo);
  if (index !== -1) {
    formularios[index].status = novoStatus;
    localStorage.setItem('formularios', JSON.stringify(formularios));
  }
}
