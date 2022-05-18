
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
divClick.onclick= mostrar_dados_dashboard()
abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}


function listarMaquinas() {


    fetch("/maquina/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {


        // console.log("resposta: ", resposta.json());
        resposta.json().then(function (resultado) {
            console.log('Esta maquina tem temp min::' + resultado[0, 2].temp_min)

            const temp_alert_min = ((Number( resultado[0, 2].temp_max) - Number( resultado[0, 2].temp_min)) * 25) / 100;
            const temp_ideal = ((Number(resultado[0, 2].temp_max) - Number( resultado[0, 2].temp_min)) * 50) / 100;
            const temp_alert_max = ((Number(resultado[0, 2].temp_max) - Number( resultado[0, 2].temp_min)) * 75) / 100;
            let kpi = new Array(temp_min_crit, temp_alert_min, temp_ideal, temp_alert_max, temp_max_crit)
            for (var i = 0; i < resultado.length; i++) {
                clonar(resposta.nome_maquina)
                console.log(resultado[i, i].nome_maquina)
                console.log(kpi)
                spanValor.innerHTML = resultado[i, i].nome_maquina;
                mostrar_dados_dashboard(resultado[i, i].nome_maquina, kpi, 'grafico1', myChart1, 'myChartMedia')
            }

        })
        // if (resposta.ok) {
        //     alert('Maquina Cadastrada')

        // } else {
        //     throw ("Houve um erro ao tentar realizar o cadastro!");
        // }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })

}
await listarMaquinas()
//Envio de dados de cadastro

function clonar(atributo) {
    var clonarDiv = document.querySelector('.identificacao_maq').cloneNode(true);
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var container = document.querySelector('#container_redutores');
    container.appendChild(clonarDiv);
    clonarDiv.setAttribute("id", atributo);
    divImagem.style.backgroundColor = "#" + randomColor;
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


function mostrar_dados_dashboard(idMaquina, vetor, div_grafico, myChart, myChartMedia) {
    console.log(intervalo)
    if (intervalo !== undefined) {
        clearInterval(intervalo)
    }
    intervalo = setInterval(function () {
        adicionar_dados(idMaquina, vetor, div_grafico, myChart, myChartMedia)

    }, 2000)
    console.log(intervalo)

}

//Exibir os gráficos da máquina selecionada pelo usuário
function adicionar_dados(idMaquina, valores, div_grafico, myChart, myChartMedia) {
    var dashboard = document.getElementById(div_grafico)
    var dashboardMedia = document.getElementById(myChartMedia)
    esconder_graficos()
    operarHTML(valores)
    dashboard.style.display = 'block'
    dashboardMedia.style.display = 'block'

    function operarHTML(valores) {
        span_m_baixa.innerHTML = valores[0] + "°C"
        span_baixa.innerHTML = valores[1] + "°C"
        span_ideal.innerHTML = valores[2] + "°C"
        span_alta.innerHTML = valores[3] + "°C"
        span_m_alta.innerHTML = valores[4] + "°C"
        addData(myChart, [37.8, 40.5, 45, 43, 39.5])
    }
    function addData(myChart, temperatura) {
        myChart.data.labels.push(new Date().toLocaleTimeString())
        myChart.data.datasets[0].data.push(temperatura[0]);
        myChart.data.datasets[0].data.push(temperatura[1]);
        myChart.data.datasets[0].data.push(temperatura[2]);
        myChart.data.datasets[0].data.push(temperatura[3]);
        myChart.data.datasets[0].data.push(temperatura[4]);
        myChart.update();
    }
    if (myChart.data.labels.length == 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
    }
    myChart.update();

    //Ocultar os demais gráficos da dashboard
    function esconder_graficos() {
        document.getElementById('grafico1').style.display = 'none'
        document.getElementById('graficoMedia').style.display = 'none'
    }
}
