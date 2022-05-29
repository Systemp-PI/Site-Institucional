var maquinaModel = require("../models/maquinaModel");

var sessoes = [];



function listar(req, res) {
    const fkCliente = req.params.fkCliente;
    maquinaModel.listar(fkCliente)
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


function listarUm(req, res) {
    const idMaquina = req.params.idMaquina
    maquinaModel.listarUm(idMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
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

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome_maq = req.body.nomeMaqServer;
    var temp_min = req.body.tempMinServer;
    var temp_max = req.body.tempMaxServer;
    var fk_cliente = req.body.fk_clienteServer;

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
        maquinaModel.cadastrar(nome_maq, temp_min, temp_max,fk_cliente)
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
function cadastrarSensor(req, res) {

        // Passe os valores como parâmetro e vá para o arquivo maquinaModel.js
        maquinaModel.cadastrarSensor()
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

function obterDadosGraficoModa_quente(req, res) {
    maquinaModel.obterDadosGraficoModa_quente(req,res)
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

function obterDadosGraficoModa_frio(req, res) {
    maquinaModel.obterDadosGraficoModa_frio(req,res)
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
module.exports = {
    obterDadosGraficoModa_quente,
    obterDadosGraficoModa_frio,
    cadastrar,
    cadastrarSensor,
    listar,
    listarUm
}