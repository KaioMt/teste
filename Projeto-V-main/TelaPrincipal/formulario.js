const token = localStorage.getItem('authToken');
if (!token) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "../index.html"; // ajuste o caminho conforme necessário
}

window.addEventListener('DOMContentLoaded', () => {
  const lista = document.querySelector('.lista-forms');
  const formularios = JSON.parse(localStorage.getItem('formularios')) || [];

  formularios.forEach(form => {
    const div = document.createElement('div');
    div.classList.add('formcriado');

    div.innerHTML = `
        <div>
          <strong>TITULO: ${form.titulo}</strong><br>
          STATUS: ${form.status}
        </div>
        <div class="codigo">${form.codigo}</div>
      `;

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


/*Viniculo com o back end */
axios.get("http://localhost:3000/user/home", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
}).then(response => {
 
  console.log(response.data.Formularios.length);
  console.log(response.data.Formularios);

  let documentos = response.data.Formularios;
  let list = document.getElementById("forms")

  documentos.forEach(doc => {

    let Item = document.createElement('div');
    Item.classList.add('item');

    Item.setAttribute("data-id", doc.IdForm);
    Item.setAttribute("data-title", doc.Titulo);

    let pElement = document.createElement('p');
    pElement.innerHTML = doc.IdForm;

    let h2Title = document.createElement('h2');
    h2Title.classList.add('title');
    h2Title.innerHTML = doc.Titulo;

    Item.appendChild(h2Title);
    Item.appendChild(pElement);

    list.appendChild(Item);
  });
}).catch(error => {
  console.log(error)
  window.location.href = "../index.html";
})