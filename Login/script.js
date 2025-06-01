const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


/*Parte para recuperação de senha */

document.getElementById("recover-form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("message").style.display = "block";
});

/*Parte para redefinição de senha*/ 

document.getElementById("reset-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const msg = document.getElementById("message");
    const error = document.getElementById("error");

    if (senha.length < 6) {
        error.textContent = "A senha deve ter pelo menos 6 caracteres.";
        msg.style.display = "none";
        return;
    }

    if (senha !== confirmar) {
        error.textContent = "As senhas não coincidem.";
        msg.style.display = "none";
        return;
    }

    error.textContent = "";
    msg.style.display = "block";

    // Espaço para conectar com o back
});
