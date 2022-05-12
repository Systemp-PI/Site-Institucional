function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var h1LoginUsuario = document.getElementById("h1_login_usuario");    

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        if (h1LoginUsuario != undefined) {
            h1LoginUsuario.innerHTML = email;
        }
        user_name.innerHTML = nome;

        // finalizarAguardar();
    } else {
        window.location = "./tela_login.html";
    }
}

function logOff() {
    sessionStorage.clear();
    window.location = "./tela_login.html";
}