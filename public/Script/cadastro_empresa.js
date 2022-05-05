var razaoSocial = ''
var pj = ''
var ie = ''
var contato1 = ''
var contato2 = ''
var email1 = ''
var email2 = ''
var tel1 = ''
var tel2 = ''
var cidade = ''

//Validação razão social
function verificarRazaoSocial(){
    razaoSocial = String(razao_social.value).trim();
    if (razaoSocial.length < 5){
        erro_razao_social.innerHTML = '*Digite no minimo 5 caracteres'
        return false
    } else {
        erro_razao_social.innerHTML = '✓'
    }
}

//Validação cnpj
function verificarCnpj(){
    pj = String(cnpj.value).trim();
    if (pj.length != 14){
        erro_cnpj.innerHTML = 'Digite 14 números'
        return false
    } else {
        erro_cnpj.innerHTML = '✓'
    }
}

//Validação inscrição estadual
function verificarIe(){
    ie = String(incscricao_estadual.value).trim();
    if (ie.length != 9){
        erro_ie.innerHTML = 'Digite 9 números'
        return false
    } else {
        erro_ie.innerHTML = '✓'
    }
}

//Validação nome contato 1
function verificarContato1(){
    contato1 = String(nomecontato1.value).trim();
    if (contato1.length < 3){
        erro_contato1.innerHTML = 'Digite no minimo 3 caracteres'
        return false
    } else {
        erro_contato1.innerHTML = '✓'
    }
}

//Validação nome contato 2
function verificarContato2(){
    contato2 = String(nomecontato2.value).trim();
    if (contato2.length < 3){
        erro_contato2.innerHTML = 'Digite no minimo 3 caracteres'
        return false
    } else {
        erro_contato2.innerHTML = '✓'
    }
}

//Validação email 1
function verificarEmail1(){
    email1 = String(emailcontato1.value).trim();
    if (email1.indexOf("@") > 3 && (email1.endsWith(".com.br") || email1.endsWith(".com") ||
    email1.endsWith(".ind.br") || email1.endsWith(".ind"))){
        erro_email1.innerHTML = '*Insira "@" e terminação .com, por exemplo'
        return false
    } else {
        erro_email1.innerHTML = '✓'
    }
}

//Validação email 2
function verificarEmail2(){
    email2 = String(emailcontato2.value).trim();
    if (email2.indexOf("@") > 3 && (email2.endsWith(".com.br") || email2.endsWith(".com") ||
    email2.endsWith(".ind.br") || email2.endsWith(".ind"))){
        erro_email2.innerHTML = '*Insira "@" e terminação .com, por exemplo'
        return false
    } else {
        erro_email2.innerHTML = '✓'
    }
}

//Validação tel Contato 1
function verificarTel1(){
    tel1 = String(telefonecontato.value).trim();
    if (tel1.length < 10){
        erro_telContato.innerHTML = 'Digite o DD e o número'
        return false
    } else {
        erro_telContato.innerHTML = '✓'
    }
}

//Validação tel Contato 2
function verificarTel2(){
    tel2 = String(telefonecontato2.value).trim();
    if (tel2.length < 10){
        erro_telContato2.innerHTML = 'Digite o DD e o número'
        return false
    } else {
        erro_telContato2.innerHTML = '✓'
    }
}

//Validação cidade
function verificarCidade(){
    cidade = String(input_cidade.value).trim();
    if (cidade.length < 3){
        erro_cidade.innerHTML = 'Digite um nome com mais de 3 caracteres'
        return false
    } else {
        erro_cidade.innerHTML = '✓'
    }
}

function cadastrar(){
    
}