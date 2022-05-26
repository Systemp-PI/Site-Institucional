var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var confirmar = req.body.confirmarServer;
    var regex = /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;

    // Faça as validações dos valores
    if (nome.length < 5) {
        res.status(400).send("Nome inválido!");
    } else if (cnpj.length != 14) {
        res.status(400).send("CNPJ inválido!");
    } else if (email.indexOf("@") < -1 && (email.indexOf(".com") < -1 || email.indexOf(".ind") < -1) ||
        email.indexOf(".com.br") < -1 || email.indexOf(".ind.br") < -1) {
        res.status(400).send("Email inválido!");
    } else if (senha.length < 8 || !regex.exec(senha)) {
        res.status(400).send("Senha inválida!");
    } else if (confirmar != senha) {
        res.status(400).send("Senha inválida!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, cnpj, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar_empresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var razao = req.body.razaoServer;
    var cnpj = req.body.cnpjServer;
    var insc_estadual = req.body.insc_estadualServer;
    var nomecont1 = req.body.nomecont1Server;
    var nomecont2 = req.body.nomecont2Server;
    var emailcont1 = req.body.emailcont1Server;
    var emailcont2 = req.body.emailcont2Server;
    var telcont1 = req.body.telcont1Server;
    var telcont2 = req.body.telcont2Server;
    var cep = req.body.cepServer ; 
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro  = req.body.bairroServer;
    var rua = req.body.ruaserver;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer
    // Faça as validações dos valores
    if (razao.length < 5) {
        res.status(400).send("Nome inválido!");
    } /* else if (cnpj.length != 14) {
        res.status(400).send("CNPJ inválido!");
    } else if (email.indexOf("@") < -1 && (email.indexOf(".com") < -1 || email.indexOf(".ind") < -1) || 
        email.indexOf(".com.br") < -1 || email.indexOf(".ind.br") < -1) {
        res.status(400).send("Email inválido!");
    } else if (senha.length < 8 || !regex.exec(senha)) {
        res.status(400).send("Senha inválida!");
    } else if (confirmar != senha) {
        res.status(400).send("Senha inválida!"); */
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_empresa(razao, cnpj, insc_estadual ,nomecont1, emailcont1, telcont1, nomecont2, emailcont2, telcont2,cep, estado, cidade, bairro,rua ,numero,complemento)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    cadastrar_empresa,
    listar,
    testar
}