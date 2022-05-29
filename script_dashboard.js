
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
//grafico moda 1
const moda_muito_alto1 =[]
const moda_alto1=[]
const moda_ideal1=[]
const moda_baixa1=[]
const moda_muito_baixa1=[]
//grafico moda 2
const moda_muito_alto2 = []
const moda_alto2=[]
const moda_ideal2=[]
const moda_baixa2=[]
const moda_muito_baixa2=[]
//grafico moda 3
const moda_muito_alto3 = []
const moda_alto3=[]
const moda_ideal3=[]
const moda_baixa3=[]
const moda_muito_baixa3=[]
//grafico moda 4
const moda_muito_alto4 =[]
const moda_alto4=[]
const moda_ideal4=[]
const moda_baixa4=[]
const moda_muito_baixa4=[]
//grafico moda 5
const moda_muito_alto5= []
const moda_alto5=[]
const moda_ideal5=[]
const moda_baixa5=[]
const moda_muito_baixa5=[]
//grafico moda 6
const moda_muito_alto6= []
const moda_alto6=[]
const moda_ideal6=[]
const moda_baixa6=[]
const moda_muito_baixa6=[]
//grafico moda 7
const moda_muito_alto7=[]
const moda_alto7=[]
const moda_ideal7=[]
const moda_baixa7=[]
const moda_muito_baixa7=[]


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



    fetch(`/maquina/obterDadosGraficoModa_frio`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('RESPOSTA::' + resultado)


        })

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })





    fetch(`/maquina/obterDadosGraficoModa_quente`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('RESPOSTA::' + resultado)


        })

    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })


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
    var exibir_titulo_moda = document.getElementById('titulo_grafico_moda')
    exibir_titulo_moda.style.display='block'
    const ctx2 = document.getElementById('myChart');
    ctx2.style.backgroundColor = '#2E4053';
    Chart.defaults.color = "white";
    Chart.defaults.borderColor = 'black';
    Chart.defaults.font.size = 20;

    const ctxMedia = document.getElementById('myChartMedia');
    ctxMedia.style.backgroundColor = '#2E4053';

    const temperaturas = resposta.map(listaLogTemp => listaLogTemp.registro_temp)
    
    const horaRegistros = resposta.map(listaLogTemp => listaLogTemp.data_hora_registro)
    const nomeMaquina = resposta.map(listaLogTemp => listaLogTemp.nome_maquina)
    console.log('nomeMaquina', nomeMaquina)
  
    const data = {
        labels: horaRegistros,
        datasets: [{
            label: nomeMaquina[0],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: temperaturas,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const chart = new Chart(
        document.getElementById('myChart'),
        config
    );


    var chartMedia = new Chart(ctxMedia, {
        type: 'polarArea',
        data: {
            datasets: [{
                data: [moda_muito_baixa2.length,moda_baixa2.length,moda_ideal2.length,moda_alto2.length,moda_muito_alto2.length],
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

  fetch(`/maquina/obterDadosGraficoModa_quente`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },

}).then(function (resposta) {
    resposta.json().then(function (resultado_maquina_quente) {
        console.log(`resultado_maquina_quente: ${JSON.stringify(resultado_maquina_quente)}`);
        console.log('resultado_maquina_quente:' + resultado_maquina_quente[1].quantidade_alertas)
 const resultadoMaquina1=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina2=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina3=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina4=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina5=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina6=resultado_maquina_quente[0].quantidade_alertas
 const resultadoMaquina7=resultado_maquina_quente[0].quantidade_alertas
  moda_muito_alto1.push(1) 
  moda_muito_alto2.push(2) 
  moda_muito_alto3.push(3) 
  moda_muito_alto4.push(4) 
  moda_muito_alto5.push(5) 
  moda_muito_alto6.push(6) 
  moda_muito_alto7.push(7)
    })}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
})

fetch(`/maquina/obterDadosGraficoModa_frio`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },

}).then(function (resposta) {
    resposta.json().then(function (resultado_maquina_frio) {
        console.log(`resultado_maquina_frio: ${JSON.stringify(resultado_maquina_frio)}`);
        console.log('resultado_maquina_frio:' + resultado_maquina_frio[1].quantidade_alertas)
 const resultadoMaquina1=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina2=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina3=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina4=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina5=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina6=resultado_maquina_frio[0].quantidade_alertas
 const resultadoMaquina7=resultado_maquina_frio[0].quantidade_alertas
 moda_muito_baixo1.push(1) 
 moda_muito_baixo2.push(2) 
 moda_muito_baixo3.push(3) 
 moda_muito_baixo4.push(4) 
 moda_muito_baixo5.push(5) 
 moda_muito_baixo6.push(6) 
 moda_muito_baixo7.push(7)
    })

}).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
})  

  fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
      if (response.ok) {
          response.json().then(function (novoRegistro) {
                console.log('IDMAQUINA::',idMaquina)
                console.log('IdivClick::',divClick1)

        var alerta_critico_alto = novoRegistro[0].temp_max;
        var alerta_alto = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 75) / 100) + novoRegistro[0].temp_min;
        var alerta_ideal = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 50) / 100) + novoRegistro[0].temp_min;
        var alerta_baixo = (((novoRegistro[0].temp_max - novoRegistro[0].temp_min) * 25) / 100) + novoRegistro[0].temp_min;
        var alerta_critico_baixo = novoRegistro[0].temp_min;
        console.log(alerta_critico_alto, alerta_alto, alerta_ideal, alerta_baixo, alerta_critico_baixo)

        var divClick1 = document.getElementById('1')
        var divClick2 = document.getElementById('2')
        var divClick3 = document.getElementById('3')
        var divClick4 = document.getElementById('4')
        var divClick5 = document.getElementById('5')
        var divClick6 = document.getElementById('6')
        var divClick7 = document.getElementById('7')

        divClick1.style.backgroundColor='green'
        divClick2.style.backgroundColor='green'
        divClick3.style.backgroundColor='yellow'
        divClick4.style.backgroundColor='red'
        divClick5.style.backgroundColor='red'
        divClick6.style.backgroundColor='blue'
        divClick7.style.backgroundColor='green'
        

if (novoRegistro[0].registro_temp > alerta_critico_alto){
    kpi_m_alto.style.boxShadow=' 0px 10px 15px 10px red';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = 'none';

    alerta.data.datasets[0].data.push(novoRegistro[0].registro_temp)
} 
else if (novoRegistro[0].registro_temp >= alerta_alto){
    kpi_m_alto.style.boxShadow='none';
    kpi_alto.style.boxShadow = '0px 10px 15px 10px orange';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = 'none';
    alerta.data.datasets[0].data.push(novoRegistro[0].registro_temp)
}

else if (novoRegistro[0].registro_temp <= alerta_critico_baixo){
    kpi_m_alto.style.boxShadow = 'none';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = 'none';
    kpi_m_baixo.style.boxShadow = '0px 10px 15px 10px blue';

    alerta.data.datasets[0].data.push(novoRegistro[0].registro_temp)
}
else if (novoRegistro[0].registro_temp <= alerta_baixo){
    kpi_m_alto.style.boxShadow = 'none';
    kpi_alto.style.boxShadow = 'none';
    kpi_ideal.style.boxShadow = 'none';
    kpi_baixo.style.boxShadow = '0px 10px 15px 10px #119db9';
    kpi_m_baixo.style.boxShadow = 'none';

    
    alerta.data.datasets[0].data.push(novoRegistro[0].registro_temp)
}   
else {
        kpi_m_alto.style.boxShadow = 'none';
        kpi_alto.style.boxShadow = 'none';
        kpi_ideal.style.boxShadow = '0px 10px 15px 10px green';
        kpi_baixo.style.boxShadow = 'none';
        kpi_m_baixo.style.boxShadow = 'none';
        

        alerta.data.datasets[0].data.push(novoRegistro[0].registro_temp)
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
