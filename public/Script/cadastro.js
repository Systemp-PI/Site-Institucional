function enviar() {
    var nome_usuario = input_nome_usuario.value
    var cnpj = input_cnpj.value 
    var email = input_email.value
    var senha = input_senha.value
    var confirma_senha = input_conf_senha.value

    //Validação nome usuário
    if (nome_usuario.length < 5){
        span_erro_nome_usuario.innerHTML = '*Digite no minímo 5 caracteres'
    }
    else {
        span_erro_nome_usuario.innerHTML = "✓"
    }

    //Validação CNPJ
    if (cnpj.length > 14 || cnpj.length < 14){
        span_erro_cnpj.innerHTML = '*Insira 14 digitos no CNPJ'
    }
    else {
        span_erro_cnpj.innerHTML = "✓"
    }

    //Validação e-mail
    if (email.indexOf('@') < 3 || email.endsWith('.com.br', '.com', '.ind.br', '.ind')){
        span_erro_email.innerHTML = '*Insira "@" e terminação .com, por exemplo'
    }
    else {
        span_erro_email.innerHTML = "✓"
    }

    //Validação senha
    var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){2})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
    if (senha.length < 8 || senha.length == 0 || senha !== regex){
        span_erro_senha.innerHTML = '*Insira uma letra maiúscula, minúscula, número <br> e um caractere especial'
    }
    else {
        span_erro_senha.innerHTML = "✓"
    }

    //Validação confirmação de senha
    if (senha !== confirma_senha || confirma_senha.length == 0) {
        span_erro_conf_senha.innerHTML = '*Senha diferente'
    }
    else {
        span_erro_conf_senha.innerHTML = "✓"
        alert('Seu cadastro foi feito com sucesso!')
    }
}
