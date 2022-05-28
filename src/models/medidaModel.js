var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {
    instrucaoSql = `select 
                        registro_temp, 
                        DATE_FORMAT(data_hora_registro,'%H:%i:%s') as data_hora_registro,
                        fk_maquina
                        from log_temperatura
                    where fk_maquina = ${idMaquina}
                    order by idregistro desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select 
                        registro_temp, 
                        fk_maquina,
                        DATE_FORMAT(data_hora_registro,'%H:%i:%s') as data_hora_registro
                        from log_temperatura where fk_maquina = ${idMaquina} 
                    order by idregistro desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}