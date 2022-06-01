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
const moda_alto = []
const moda_ideal = []
const moda_baixa = []
const moda_muito_baixa = []

var dado1 = 0
var dado2 = 0
var dado3 = 0
var dado4 = 0
var dado5 = 0
const buscarDoBanco = async (parametro) => {

    try {
        let resultado
        const request = await fetch(parametro.url, { method: parametro.method, headers: { "Content-Type": "application/json" } })
        resultado = request.json()
        return resultado
    } catch (error) {
        console.log("#ERRO: "`${res}`);
    }
}

const temperaturaAbaixoIdeal = (max, min) => (((max - min) * 25) / 100) + min
const temperaturaIdeal = (max, min) => (((max - min) * 50) / 100) + min
const temperaturaAcimaIdeal = (max, min) => (((max - min) * 75) / 100) + min

var divClick = document.getElementById('1')

abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}

var botao_filtro = document.getElementById('botao_filtro')

botao_filtro.onclick = async () => {
    console.log('aaa!')
    var select_maquinas = document.getElementById('selecionar_maquinas').value
    // const ret =  await buscarDoBanco({ url: '/maquina/listar/1', method: 'GET' })
    // console.log('ret', ret)
    var container = document.querySelector('#container_redutores')
    // container.innerHTML = '<p>aaaa!!!</p>'
    switch (select_maquinas) {
        case 'todas':
            listarMaquinas_cliente(sessionStorage.ID_USUARIO)
            break;
        default:
            var clonarDiv = document.getElementById('maquinaPrincipal').cloneNode(true);
            container.innerHTML = ''
            container.appendChild(clonarDiv)
            break;
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
            // var abaixo_ideal = tempAbaixoIdeal(resultado.temp_max, resultado.temp_min)
            // var ideal = tempIdeal(resultado.temp_max, resultado.temp_min)
            // var acima_ideal = tempAcimaIdeal(resultado.temp_max, resultado.temp_min)
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
            console.log('RESPOSTA::', resultado)
            document.querySelector('#container_redutores').innerHTML = '';

            for (var i = 0; i < resultado.length; i++) {
                clonarMaquina(resultado[i])
                // console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
                // spanValor.innerHTML = resultado[i, i].nome_maquina;
            }

            // var elementoClicado = document.getElementById('container_redutores');
            // elementoClicado.addEventListener('click', function (ident) {
            //     listarMaquinas(ident.target.id)
            //     obterDadosGrafico(ident.target.id)
            //     console.log(ident.target.id)
            //     divClick = document.getElementById(ident.target.id)
            // })


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

function clonarMaquina(maquina) {
    var container = document.querySelector('#container_redutores');
    var clonarDiv = document.querySelector('.identificacao_maq').cloneNode(true);

    // var elementoClicado = document.getElementById('container_redutores');
    clonarDiv.addEventListener('click', () => {
        console.log('ident', maquina.idmaquina)
        listarMaquinas(maquina.idmaquina)
        obterDadosGrafico(maquina.idmaquina)
        divClick = document.getElementById(maquina.idmaquina)
    })

    clonarDiv.querySelector('#valorSpan').innerHTML = maquina.nome_maquina
    clonarDiv.querySelector('.redutor_img.img1').id = "m" + maquina.idmaquina
    // console.log('aaa', clonarDiv.querySelector('#maq1'))
    clonarDiv.id = maquina.idmaquina
    container.appendChild(clonarDiv);
    // divImagem.id = `${maquina.idmaquina}`

}
function mostrarSaudeMaquinas() {
    const maquina1 = document.querySelector('#m1')
    const maquina2 = document.querySelector('#m2')
    const maquina3 = document.querySelector('#m3')
    const maquina4 = document.querySelector('#m4')
    const maquina5 = document.querySelector('#m5')
    const maquina6 = document.querySelector('#m6')
    const maquina7 = document.querySelector('#m7')
    maquina1.style.backgroundColor = 'green'
    maquina2.style.backgroundColor = 'aqua'
    maquina3.style.backgroundColor = 'green'
    maquina4.style.backgroundColor = 'blue'
    maquina5.style.backgroundColor = 'green'
    maquina6.style.backgroundColor = 'orange'
    maquina7.style.backgroundColor = 'red'


}
cadastrar_Maquinas.onclick = function cadastrarMaquinas() {
    var nome_maq = String(input_nome_maquina.value)
    var temp_min = Number(input_temperatura_min.value)
    var temp_max = Number(input_temperatura_max.value)
    var fk_cliente = sessionStorage.ID_USUARIO
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
            console.log('Maquina Cadastrada')

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
    mostrarSaudeMaquinas()
    console.log('resposta:', resposta)
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
                data: [dado1, dado2, dado3, dado4, dado5],
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
    setTimeout(() =>  atualizarGrafico(idMaquina, chart, chartMedia), 2000);
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
                console.log('IDMAQUINA::', idMaquina)
                console.log('IdivClick::', divClick)

                var alerta_critico_alto = novoRegistro[0].temp_max;
                var alerta_alto = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 75) / 100) + novoRegistro[0].temp_min;
                var alerta_ideal = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 50) / 100) + novoRegistro[0].temp_min;
                var alerta_baixo = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 25) / 100) + novoRegistro[0].temp_min;
                var alerta_critico_baixo = novoRegistro[0].temp_min;
      

                console.log(alerta_critico_alto, alerta_alto, alerta_ideal, alerta_baixo, alerta_critico_baixo)
                if (novoRegistro[0].registro_temp > alerta_critico_alto) {
                    kpi_m_alto.style.boxShadow = '0 10px 15px 10px red';
                    kpi_alto.style.boxShadow = 'none';
                    kpi_ideal.style.boxShadow = 'none';
                    kpi_baixo.style.boxShadow = 'none';
                    kpi_m_baixo.style.boxShadow = 'none';

                    moda_muito_alto.unshift(novoRegistro[0])
                    alerta.data.datasets[0].data.push(moda_muito_alto.length)
                } else if (novoRegistro[0].registro_temp >= alerta_alto) {
                    kpi_m_alto.style.boxShadow = 'none';
                    kpi_alto.style.boxShadow = '0px 10px 15px 10px orange';
                    kpi_ideal.style.boxShadow = 'none';
                    kpi_baixo.style.boxShadow = 'none';
                    kpi_m_baixo.style.boxShadow = 'none';

                
                    moda_alto.unshift(novoRegistro[0])
                    alerta.data.datasets[0].data.push(moda_alto.length)
                }

                else if (novoRegistro[0].registro_temp <= alerta_critico_baixo) {
                    kpi_m_alto.style.boxShadow = 'none';
                    kpi_alto.style.boxShadow = 'none';
                    kpi_ideal.style.boxShadow = 'none';
                    kpi_baixo.style.boxShadow = 'none';
                    kpi_m_baixo.style.boxShadow = '0px 10px 15px 10px blue';

                    moda_muito_baixa.unshift(novoRegistro[0])
                    alerta.data.datasets[0].data.push(moda_muito_baixa.length)
                }
                else if (novoRegistro[0].registro_temp <= alerta_baixo) {
                    kpi_m_alto.style.boxShadow = 'none';
                    kpi_alto.style.boxShadow = 'none';
                    kpi_ideal.style.boxShadow = 'none';
                    kpi_baixo.style.boxShadow = '0px 10px 15px 10px #119db9';
                    kpi_m_baixo.style.boxShadow = 'none';

                
                    moda_baixa.unshift(novoRegistro[0])
                    alerta.data.datasets[0].data.push(moda_baixa.length)
                }
                else {
                    kpi_m_alto.style.boxShadow = 'none';
                    kpi_alto.style.boxShadow = 'none';
                    kpi_ideal.style.boxShadow = '0px 10px 15px 10px green';
                    kpi_baixo.style.boxShadow = 'none';
                    kpi_m_baixo.style.boxShadow = 'none';

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
                switch (idMaquina) {
                    case 1:
                        dado1 = 15 
                        dado2 = 2
                        dado3 = 90
                        dado4 =  11
                        dado5 =  3
                        break;
                    case 2:
                        dado1 = 22 
                        dado2 = 78  
                        dado3 = 11
                        dado4 = 1
                        dado5 = 0
                        break;
                    case 3:
                        dado1 = 15 
                        dado2 = 45
                        dado3 = 77
                        dado4 = 22
                        dado5 = 10
                        break;
                    case 4:
                        dado1 = 150 
                        dado2 = 12
                        dado3 = 14
                        dado4 = 1
                        dado5 = 0
                        break;
                    case 5:
                        dado1 = 5 
                        dado2 = 4
                        dado3 = 118
                        dado4 = 41
                        dado5 = 15 
                        break;
                    case 6:
                        dado1 = 15 
                        dado2 = 43
                        dado3 = 35
                        dado4 = 43
                        dado5 = 11
                        break;
                
                    default:
                        dado1 = 32
                        dado2 = 23
                        dado3 = 15
                        dado4 = 23
                        dado5 = 46
                        break;
                }
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