var database = require("../database/config")

/* 
function maquinas_quentes(fkCliente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select * from maquina where fk_cliente= '${fkCliente}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function maquinas_frias(fkCliente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select * from maquina where fk_cliente= '${fkCliente}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} */
function listar(fkCliente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select * from maquina where fk_cliente= '${fkCliente}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarUm(idMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM maquina 
        join log_temperatura on fk_maquina = idMaquina
          where idmaquina = '${idMaquina}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao

function cadastrar(nome_maq, temp_min, temp_max,fk_cliente) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome_maq,temp_min,temp_max );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO maquina (nome_maquina, temp_min, temp_max,fk_cliente) VALUES ('${nome_maq}', '${temp_min}' ,'${temp_max}','${fk_cliente}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarSensor() {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO log_temperatura (fk_maquina) VALUES ((Select idmaquina from maquina order by idmaquina desc limit 1)) ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterDadosGraficoModa_quente (){
var instrucao =`
select idmaquina,count(registro_temp) as 'quantidade_alertas' , nome_maquina
from  log_temperatura
join maquina 
on fk_maquina = idmaquina where fk_cliente=1 and  registro_temp > (((temp_max - temp_min) * 50) / 100) + temp_min group by  idmaquina order by idmaquina asc;
`
console.log("Executando a instrução SQL: \n" + instrucao);
return database.executar(instrucao);
}

function obterDadosGraficoModa_frio (){
var instrucao =`
select idmaquina,count(registro_temp) as 'quantidade_alertas' , nome_maquina
from  log_temperatura
join maquina 
on fk_maquina = idmaquina where fk_cliente=1 and  registro_temp < (((temp_max - temp_min) * 50) / 100) + temp_min group by  idmaquina order by idmaquina asc;

`
console.log("Executando a instrução SQL: \n" + instrucao);
return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    obterDadosGraficoModa_quente,
    obterDadosGraficoModa_frio,
    cadastrarSensor,
    listar,
    listarUm
};