var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get("/", function (req, res) {
    maquinaController.testar(req, res);
});

router.get("/listar/:fkCliente", function (req, res) {
    maquinaController.listar(req, res);
});

router.get("/listarUm/:idMaquina", function (req, res) {
    maquinaController.listarUm(req, res);
});
router.get("/obterDadosGraficoModa_quente", function (req, res) {
    maquinaController.obterDadosGraficoModa_quente(req, res);
});
router.get("/obterDadosGraficoModa_frio", function (req, res) {
    maquinaController.obterDadosGraficoModa_frio(req, res);
});
//Recebendo os dados do html e direcionando para a função cadastrar de maquinaController.js
router.post("/cadastrar", function (req, res) {
    maquinaController.cadastrar(req, res);
})
router.post("/cadastrarSensor", function (req, res) {
    maquinaController.cadastrarSensor(req, res);
})

router.post("/autenticar", function (req, res) {
    maquinaController.entrar(req, res);
});

module.exports = router;