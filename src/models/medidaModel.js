var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {
    instrucaoSql = `select 
                        registro_temp, 
                        DATE_FORMAT(data_hora_registro,'%H:%i:%s') as data_hora_registro,
                        fk_maquina, nome_maquina
                        from log_temperatura
                        join maquina on fk_maquina = idmaquina
                    where fk_maquina = ${idMaquina}
                    order by idregistro desc limit 10`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select 
                     registro_temp, 
                     DATE_FORMAT(data_hora_registro,'%H:%i:%s') as data_hora_registro,
                      fk_maquina, nome_maquina,temp_min,temp_max
                          from log_temperatura
                        join maquina on fk_maquina = idmaquina
                        where fk_maquina = ${idMaquina}
                        order by idregistro desc limit 10`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}