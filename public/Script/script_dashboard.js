
//Abrir/fechar tela de cadastro de máquina
var tela_cadastro = document.getElementById("formulario_maquina_nova");
var abrir_tela = document.getElementById("add_icon");
var fechar_tela = document.getElementById("exit_icon");
var cadastrar_Maquinas = document.getElementById("btn_enviar_cadastro");
var form_envio = document.getElementById('formulario_envio')
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


window.onload = listarMaquinas_cliente(1)
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
            console.log('Esta maquina tem temp min::' + resultado[0, 0].temp_min)

            for (var i = 0; i < resultado.length; i++) {
                clonar(resultado[i, i].idmaquina, ` ${resultado[i, i].idmaquina}`)
                console.log(resultado[i, i].idmaquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
                spanValor.innerHTML = resultado[i, i].nome_maquina;

            }

            var elementoClicado = document.getElementById('container_redutores');
            elementoClicado.addEventListener('click', function (ident) {
                listarMaquinas(ident.target.id)
                obterDadosGrafico(ident.target.id)
                console.log(ident.target.id)

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

function clonar(teste, params) {

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
    ctx2.style.backgroundColor = '#2E4053';
    Chart.defaults.color = "white";
    Chart.defaults.borderColor = 'black';
    Chart.defaults.font.size = 20;

    const ctxMedia = document.getElementById('myChartMedia');
    ctxMedia.style.backgroundColor = '#2E4053';

    const temperaturas = resposta.map(listaLogTemp => listaLogTemp.registro_temp)
    // [90,90,90,90,90,50]
    // console.log('temperaturas', temperaturas)
    //data_hora_registro
    const horaRegistros = resposta.map(listaLogTemp => listaLogTemp.data_hora_registro)
    const nomeMaquina = resposta.map(listaLogTemp => listaLogTemp.nome_maquina)
    console.log('nomeMaquina', nomeMaquina)
    // console.log('horaRegistros', horaRegistros)

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
                data: [3, 4, 10, 6, 4],
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
    setTimeout(() => atualizarGrafico(idMaquina, chart), 2000);
}

function atualizarGrafico(idMaquina, dados) {

    fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

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
