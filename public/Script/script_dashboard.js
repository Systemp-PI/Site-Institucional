
//Abrir/fechar tela de cadastro de máquina
var tela_cadastro = document.getElementById("formulario_maquina_nova");
var abrir_tela = document.getElementById("add_icon");
var fechar_tela = document.getElementById("exit_icon");
var cadastrar_Maquinas = document.getElementById("btn_enviar_cadastro");
var form_envio = document.getElementById('formulario_envio')
var intervalo
var spanValor = document.getElementById('valorSpan')
var divMaquina = document.querySelector(`maq1`)
var divImagem = document.querySelector(`.redutor_img`)
var divClick = document.querySelector('.identificacao_maq')

abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}


function listarMaquinas(idMaquina) {

    fetch(`/maquina/listarUm/${idMaquina}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {
        resposta.json().then(function (resultado) {
            console.log('resultado',resultado)
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

fetch("/maquina/listar", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
}).then(function (resposta) {

    resposta.json().then(function (resultado) {
        console.log('Esta maquina tem temp min::' + resultado[0, 0].temp_min)

        for (var i = 0; i < resultado.length; i++) {
            clonar(resultado[i, i].idmaquina, ` ${resultado[i, i].idmaquina}`)
            console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
            spanValor.innerHTML = resultado[i, i].nome_maquina;

        }
        /*        var elementoClicado = document.getElementById('container_redutores');
               elementoClicado.addEventListener('click', function (ident) {
                   myDynamicChart(ident.target.id)
                   operarHTML([])
                   console.log(ident.target.id)
                   console.log(resultado[0,0].idmaquina)
               }) */
        var elementoClicado = document.getElementById('container_redutores');
        elementoClicado.addEventListener('click', function (ident) {
            listarMaquinas(ident.target.id)
            obterDadosGrafico(ident.target.id)
            console.log(ident.target.id)
           /* myDynamicChart(resultado[0, 0].nome_maquina, resultado[3].temp_min) */
        })
        
        /* var dynamic_chart;
        var ctx2; */

       /*  function myDynamicChart(chart, temperatura) {
            const datateste = {
                labels: labels,
                datasets: [{
                    label: `${chart}`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [temperatura],
                }]
            };
            ctx2 = document.querySelectorAll('#myChart');
            dynamic_chart = new Chart(ctx2, {
                type: 'line',
                data: datateste,
                options: {}
            });

        } */
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

function addData(myChart, temperatura) {
    /*  myChart.data.labels.push(new Date().toLocaleTimeString()) */
    myChart.data.datasets[0].data.push(temperatura[0]);
    myChart.data.datasets[0].data.push(temperatura[1]);
    myChart.data.datasets[0].data.push(temperatura[2]);
    myChart.data.datasets[0].data.push(temperatura[3]);
    myChart.data.datasets[0].data.push(temperatura[4]);
    myChart.update();
}

function clonar(teste, params) {

    var clonarDiv = document.querySelector('.identificacao_maq').cloneNode(true);
    var container = document.querySelector('#container_redutores');
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    container.appendChild(clonarDiv);
    divImagem.style.backgroundColor = "#" + randomColor;
    divImagem.id = `${params}`
}


cadastrar_Maquinas.onclick = function cadastrarMaquinas() {
    var nome_maq = String(input_nome_maquina.value)
    var temp_min = Number(input_temperatura_min.value)
    var temp_max = Number(input_temperatura_max.value)
    alert(nome_maq)
    fetch("/maquina/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeMaqServer: nome_maq,
            tempMinServer: temp_min,
            tempMaxServer: temp_max
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

    return false;
}

//Exibir os gráficos da máquina selecionada pelo usuário
/* function adicionar_dados(idMaquina, valores, div_grafico, myChart, myChartMedia) {
    var dashboard = document.getElementById(div_grafico)
    var dashboardMedia = document.getElementById(myChartMedia)
    esconder_graficos()
    operarHTML(valores)
    dashboard.style.display = 'block'
    dashboardMedia.style.display = 'block'



    if (myChart.data.labels.length == 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
    }
    myChart.update();
} */
var proximaAtualizacao;


function obterDadosGrafico(idMaquina) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    console.log('idMaquinaidMaquinaidMaquinaidMaquina', idMaquina)

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

function plotarGrafico(resposta,idMaquina) {
    // console.log(resposta)
    console.log('iniciando plotagem do gráfico...');
    if (Chart.getChart("myChart")) {
        Chart.getChart("myChart").destroy();
    }

    const ctx2 = document.getElementById('myChart');
    ctx2.style.backgroundColor = '#2E4053';
    Chart.defaults.color = "white";
    Chart.defaults.borderColor = 'black';
    Chart.defaults.font.size = 20;

    const temperaturas = resposta.map(listaLogTemp => listaLogTemp.registro_temp)
    // [90,90,90,90,90,50]
    // console.log('temperaturas', temperaturas)
    //data_hora_registro
    const horaRegistros = resposta.map(listaLogTemp => listaLogTemp.data_hora_registro)

    // console.log('horaRegistros', horaRegistros)

    const data = {
        labels: horaRegistros,
        datasets: [{
        label: 'Sensor entrada',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: temperaturas,
    }]};

    const config = {
        type: 'line',
        data: data,
        options: {}
    };

    const chart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // for (var i = 0; i < resposta.length; i++) {
    //     var registro = resposta[i];
    //     myChart.labels.push(registro.data_hora_registro);
    //     myChart.datasets[0].data.push(registro.registro_temp);
    // }

    // console.log('aaaa', JSON.stringify(dados));

    /*
    function sendData() {
        var http = new XMLHttpRequest();
        http.open('POST', 'http://localhost:3000/api/sendData', false);
        http.send(null);
    }

    setInterval(() => {
        sendData();
    }, 2000);
    */

    //Atualiza os dados de 2 em 2 segundos
    setTimeout(() => atualizarGrafico(idMaquina, chart), 2000);
}

function atualizarGrafico(idMaquina, dados) {

    fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

                // tirando e colocando valores no gráfico
                dados.data.labels.shift(); // apagar o primeiro
                dados.data.labels.push(novoRegistro[0].data_hora_registro); // incluir um novo momento
                dados.data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                dados.data.datasets[0].data.push(novoRegistro[0].registro_temp); 
                dados.update();

                proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}