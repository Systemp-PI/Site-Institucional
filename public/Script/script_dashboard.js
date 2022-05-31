//Abrir/fechar tela de cadastro de máquina
var tela_cadastro = document.getElementById("formulario_maquina_nova");
var abrir_tela = document.getElementById("add_icon");
var fechar_tela = document.getElementById("exit_icon");
//formulario maquina
var cadastrar_Maquinas = document.getElementById("btn_enviar_cadastro");
var form_envio = document.getElementById('formulario_envio')
var spanValor = document.getElementById('valorSpan')
var divMaquina = document.querySelector(`maq1`)
var divImagem = document.querySelector(`.redutor_img`)
//grafico moda
const moda_muito_alto = []
const moda_alto=[]
const moda_ideal=[]
const moda_baixa=[]
const moda_muito_baixa=[]
var divClick = document.getElementById('1')

abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}

var botao_filtro = document.getElementById('botao_filtro')

botao_filtro.onclick= function filtrar(){
    var select_maquinas = document.getElementById('selecionar_maquinas').value
if (select_maquinas == 'muito_alta' ){
    listarMaquinas_muitoQuentes(sessionStorage.ID_USUARIO)
}
else if (select_maquinas == 'muito_baixa'){
    listarMaquinas_muitoFrias(sessionStorage.ID_USUARIO)
}
else if (select_maquinas == 'alta'){

}
else if (select_maquinas == 'baixa'){

}
else{
listarMaquinas_cliente(sessionStorage.ID_USUARIO)
}

}

function listarMaquinas(idMaquina) {

    fetch(`/maquina/listarUm/${idMaquina}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('resultado', resultado)
            console.log(resultado.temp_min + "=======" + resultado.temp_max)
            var abaixo_ideal = (((resultado.temp_max - resultado.temp_min) * 25) / 100) + resultado.temp_min;
            var ideal = (((resultado.temp_max - resultado.temp_min) * 50) / 100) + resultado.temp_min;
            var acima_ideal = (((resultado.temp_max - resultado.temp_min) * 75) / 100) + resultado.temp_min;
            operarHTML([resultado.temp_min, abaixo_ideal, ideal, acima_ideal, resultado.temp_max])

            /* resposta.json().then(function (resultado) { */
            console.log('teste', resultado[0, 0].idmaquina)
            if (resposta.ok) {
                console.log("resposta: ", resposta.json());
                console.log("resposta: ", resposta.json().idmaquina);

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
            }
            /*}).catch(function (res) {
                console.log("#ERRO: "`${res}`);
            });*/
        }).catch(function (res) {
            console.log("#ERRO: "`${res}`);
        });
    })
}


function listarMaquinas_cliente(fkCliente) {
    var id = sessionStorage.ID_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    user_name.innerHTML = nome;
    user_id.innerHTML = id;
    fetch(`/maquina/listar/${fkCliente}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('RESPOSTA::' + resultado)

            for (var i = 0; i < resultado.length; i++) {
                clonar(resultado[i, i].idmaquina, `${resultado[i, i].idmaquina}`)
                console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
                spanValor.innerHTML = resultado[i, i].nome_maquina;

            }

            var elementoClicado = document.getElementById('container_redutores');
            elementoClicado.addEventListener('click', function (ident) {
                listarMaquinas(ident.target.id)
                obterDadosGrafico(ident.target.id)
                console.log(ident.target.id)
                divClick = document.getElementById(ident.target.id)
            })


        })

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })
}
function listarMaquinas_muitoFrias(fkCliente) {
    var id = sessionStorage.ID_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    user_name.innerHTML = nome;
    user_id.innerHTML = id;
    fetch(`/maquina/maquinas_muito_frias/${fkCliente}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('RESPOSTA::' + resultado)

            for (var i = 0; i < 3; i++) {
                clonar(resultado[i, i].idmaquina, `${resultado[i, i].idmaquina}`)
                console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
                spanValor.innerHTML = resultado[i, i].nome_maquina;

            }

            var elementoClicado = document.getElementById('container_redutores');
            elementoClicado.addEventListener('click', function (ident) {
                listarMaquinas(ident.target.id)
                obterDadosGrafico(ident.target.id)
                console.log(ident.target.id)
                divClick = document.getElementById(ident.target.id)
            })


        })

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })
}

function listarMaquinas_muitoQuentes(fkCliente) {
    var id = sessionStorage.ID_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    user_name.innerHTML = nome;
    user_id.innerHTML = id;
    fetch(`/maquina/maquinas_muito_quentes/${fkCliente}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('RESPOSTA::' + resultado)

            for (var i = 0; i < resultado.length; i++) {
                clonar(resultado[i, i].idmaquina, `${resultado[i, i].idmaquina}`)
                console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
                spanValor.innerHTML = resultado[i, i].nome_maquina;

            }

            var elementoClicado = document.getElementById('container_redutores');
            elementoClicado.addEventListener('click', function (ident) {
                listarMaquinas(ident.target.id)
                obterDadosGrafico(ident.target.id)
                console.log(ident.target.id)
                divClick = document.getElementById(ident.target.id)
            })


        })

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })
}

function operarHTML(valores) {
    span_m_baixa.innerHTML = valores[0] + "°C"
    span_baixa.innerHTML = valores[1] + "°C"
    span_ideal.innerHTML = valores[2] + "°C"
    span_alta.innerHTML = valores[3] + "°C"
    span_m_alta.innerHTML = valores[4] + "°C"
    addData(myChart, valores)
}

function clonar(teste,params) {

    var clonarDiv = document.querySelector('.identificacao_maq').cloneNode(true);
    var container = document.querySelector('#container_redutores');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    container.appendChild(clonarDiv);
    divImagem.id = `${params}`
}


cadastrar_Maquinas.onclick = function cadastrarMaquinas() {
    var nome_maq = String(input_nome_maquina.value)
    var temp_min = Number(input_temperatura_min.value)
    var temp_max = Number(input_temperatura_max.value)
    var fk_cliente = sessionStorage.ID_USUARIO
    alert(nome_maq)
    fetch("/maquina/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaqServer: nome_maq,
            tempMinServer: temp_min,
            tempMaxServer: temp_max,
            fk_clienteServer: fk_cliente
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert('Maquina Cadastrada')

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    fetch("/maquina/cadastrarSensor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            alert('Maquina Cadastrada')

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

var proximaAtualizacao;


function obterDadosGrafico(idMaquina) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }


    fetch(`/medidas/ultimas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idMaquina);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGrafico(resposta, idMaquina) {
    console.log('resposta:', resposta)
    // console.log(resposta)
    console.log('iniciando plotagem do gráfico...');
    if (Chart.getChart("myChart")) {
        Chart.getChart("myChart").destroy();
    }
    if (Chart.getChart("myChartMedia")) {
        Chart.getChart("myChartMedia").destroy();
    }

    const ctx2 = document.getElementById('myChart');
    ctx2.style.backgroundColor = '#1B262C';
    ctx2.style.padding = '10px';
    Chart.defaults.color = "white";
    Chart.defaults.borderColor = '#000';
    Chart.defaults.font.size = 18;

    const ctxMedia = document.getElementById('myChartMedia');
    ctxMedia.style.backgroundColor = '#6c757d';

    const temperaturas = resposta.map(listaLogTemp => listaLogTemp.registro_temp)
    
    const horaRegistros = resposta.map(listaLogTemp => listaLogTemp.data_hora_registro)
    const nomeMaquina = resposta.map(listaLogTemp => listaLogTemp.nome_maquina)
    console.log('nomeMaquina', nomeMaquina)
  
    const data = {
        labels: horaRegistros,
        datasets: [{
            label: nomeMaquina[0],
            backgroundColor: '#787cb9',
            borderColor: '#787cb9',
            data: temperaturas,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            
        }
    };

    const chart = new Chart(
        document.getElementById('myChart'),
        config
    );


    var chartMedia = new Chart(ctxMedia, {
        type: 'polarArea',
        data: {
            datasets: [{
                data: [moda_muito_baixa.length,moda_baixa.length,moda_ideal.length,moda_alto.length,moda_muito_alto.length],
                color: 'red',
                backgroundColor: [
                    'blue',
                    'lightblue',
                    'green',
                    'orange',
                    'red'
                ]
            }], labels: [

                'Temp. baixo critico',
                'Temp. baixo',
                'Temp. ideal',
                'Temp. alta',
                'Temp. alta critico'
            ]
        }
    })


    //Atualiza os dados de 2 em 2 segundos
    setTimeout(() => atualizarGrafico(idMaquina, chart, chartMedia), 2000);
}

function atualizarGrafico(idMaquina, dados, alerta) {
  var kpi_m_alto = document.querySelector('.alertas.m_alta')
  var kpi_alto = document.querySelector('.alertas.alta')
  var kpi_ideal = document.querySelector('.alertas.ideal')
  var kpi_baixo = document.querySelector('.alertas.baixa')
  var kpi_m_baixo = document.querySelector('.alertas.m_baixa')
  
  fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
                console.log('IDMAQUINA::',idMaquina)
                console.log('IdivClick::',divClick)

        var alerta_critico_alto = novoRegistro[0].temp_max;
        var alerta_alto = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 75) / 100) + novoRegistro[0].temp_min;
        var alerta_ideal = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 50) / 100) + novoRegistro[0].temp_min;
        var alerta_baixo = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 25) / 100) + novoRegistro[0].temp_min;
        var alerta_critico_baixo = novoRegistro[0].temp_min;
        console.log(alerta_critico_alto, alerta_alto, alerta_ideal, alerta_baixo, alerta_critico_baixo)
if (novoRegistro[0].registro_temp > alerta_critico_alto){
    kpi_m_alto.style.boxShadow=' 15px 10px 15px 10px red';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = 'none';

    divClick.style.backgroundColor = 'red'
    moda_muito_alto.unshift(novoRegistro[0])
    alerta.data.datasets[0].data.push(moda_muito_alto.length)
} else if (novoRegistro[0].registro_temp >= alerta_alto){
    kpi_m_alto.style.boxShadow='none';
    kpi_alto.style.boxShadow = '0px 10px 15px 10px orange';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = 'none';

    divClick.style.backgroundColor = 'orange'
    moda_alto.unshift(novoRegistro[0])
    alerta.data.datasets[0].data.push(moda_alto.length)
}

else if (novoRegistro[0].registro_temp <= alerta_critico_baixo){
    kpi_m_alto.style.boxShadow = 'none';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = '0px 10px 15px 10px blue';

    divClick.style.backgroundColor = 'blue'
    moda_muito_baixa.unshift(novoRegistro[0])
    alerta.data.datasets[0].data.push(moda_muito_baixa.length)
}
else if (novoRegistro[0].registro_temp <= alerta_baixo){
    kpi_m_alto.style.boxShadow = 'none';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = '0px 10px 15px 10px #119db9';
    kpi_m_baixo.style.boxShadow = 'none';

    divClick.style.backgroundColor = '#119db9'
    moda_baixa.unshift(novoRegistro[0])
    alerta.data.datasets[0].data.push(moda_baixa.length)
}   
else {
        kpi_m_alto.style.boxShadow = 'none';
        kpi_alto.style.boxShadow = 'none';
        kpi_ideal.style.boxShadow = '0px 15px 15px 15px green';
        kpi_baixo.style.boxShadow = 'none';
        kpi_m_baixo.style.boxShadow = 'none';
        
        divClick.style.backgroundColor = 'green'
        moda_ideal.unshift(novoRegistro[0])
        alerta.data.datasets[0].data.push(moda_ideal.length)
}
                // tirando e colocando valores no gráfico
                dados.data.labels.shift(); // apagar o primeiro
                dados.data.labels.push(novoRegistro[0].data_hora_registro); // incluir um novo momento
                dados.data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                dados.data.datasets[0].data.push(novoRegistro[0].registro_temp);
                dados.update();

                proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, alerta), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados, alerta), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}