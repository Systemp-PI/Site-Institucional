var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cnpj, email, senha );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (Nome_usuario, CNPJ, email, senha) VALUES ('${nome}', '${cnpj}' ,'${email}', '${senha}' );
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar_empresa(razao, cnpj, insc_estadual, nomecont1, emailcont1, telcont1, nomecont2, emailcont2, telcont2,cep, estado, cidade , bairro ,rua ,numero,complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_empresa():",razao, cnpj, insc_estadual, nomecont1, emailcont1, telcont1, nomecont2, emailcont2, telcont2,cep,estado, cidade, bairro ,rua ,numero,complemento );
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresas (razao_social, cnpj, inscricao_estadual, contato_nome, contato_email, contato_tel, contato2_nome, contato2_email, contato2_tel, cep, estado, cidade, bairro, rua, numero, complemento) VALUES ('${razao}', '${cnpj}' ,'${insc_estadual}', '${nomecont1}', '${emailcont1}', '${telcont1}', '${nomecont2}', '${emailcont2}', '${telcont2}', '${cep}', '${estado}', '${cidade}', '${bairro}, '${rua}', '${numero}', '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    cadastrar_empresa,
    listar,
};
