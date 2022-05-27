var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {
    instrucaoSql = `select 
                        registro_temp, 
                        data_hora_registro, 
                        fkSensor,
                        from log_temperatura
                    where fk_maquina = ${idMaquina}
                    order by idregistro desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select 
                        registro_temp, 
                        data_hora_registro,  
                        fkSensor 
                        from log_temperatura where fk_maquina = ${idMaquina} 
                    order by idregistro desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}