var usuarioModel = require("../models/maquinaModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    maquinaModel.listar()
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

/* function entrar(req, res) {
    var nome_maq = req.body.nomeMaqServer;
    var temp_min = req.body.tempMinServer;
    var temp_max = req.body.tempMaxServer;

    if (nome_maq == undefined) {
        res.status(400).send("Seu nome maquina está undefined!");
    } else if (temp_min == undefined) {
        res.status(400).send("Sua temperatura minima está indefinida!");
    } else if (temp_max == undefined) {
        res.status(400).send("Sua temperatura maxima está indefinida!");
    } else {
        
        maquinaModel.entrar(nome_maq, temp_min, temp_max)
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

} */

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome_maq = req.body.nomeMaqServer;
    var temp_min = req.body.tempMinServer;
    var temp_max = req.body.tempMaxServer;


    // Faça as validações dos valores
    if (nome_maq == '') {
        res.status(400).send("Nome de máquina inválido!");
    } else if (temp_min == '') {
        res.status(400).send("Temperatura minima inválido!");
    } else if (temp_max == '') {
        res.status(400).send("Temperatura maxima inválido!");
    }
     else {
        
        // Passe os valores como parâmetro e vá para o arquivo maquinaModel.js
        maquinaModel.cadastrar(nome_maq, temp_min, temp_max)
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
    listar,
    testar
}