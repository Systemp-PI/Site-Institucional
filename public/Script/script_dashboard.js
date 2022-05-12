
//Abrir/fechar tela de cadastro de máquina
var tela_cadastro = document.getElementById("formulario_maquina_nova");
var abrir_tela = document.getElementById("add_icon");
var fechar_tela = document.getElementById("exit_icon");

abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}


//Envio de dados de cadastro
var form_envio = document.getElementById('formulario_envio')
var intervalo
var temp_alerta_quente =0
var temp_ideal = 0
var temp_alerta_frio = 0
var spanValor = document.getElementById('valorSpan')
var divMaquina = document.querySelector(`maq1`)
var divImagem= document.querySelector(`.redutor_img`)
var nomes = ["maq2", "maq3", "maq4", "maq5", "maq6", "maq7", "maq8", "maq9", "maq10", "maq11"]


function clonar(atributo) {
    var clonarDiv = document.querySelector('.identificacao_maq').cloneNode(true);
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var container = document.querySelector('#container_redutores');
    container.appendChild(clonarDiv);
    clonarDiv.setAttribute("id",`maq${atributo}`);
    spanValor.innerHTML=`Maquina ${atributo}`;
    divImagem.style.backgroundColor = "#"+ randomColor ;
}
function criarItens() {
    for (var i = 2; i < 12; i++) {
        clonar(i)
        console.log()
    }
    mostrar_dados_dashboard(`maquinaPrincipal`, [12,13,14,15,16], 'grafico1', myChart1, 'graficoMedia')
}
window.onload = criarItens()

function enviar_dados_maquina() {
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
function mostrar_dados_dashboard(idMaquina, vetor,div_grafico, myChart, myChartMedia) {
    console.log(intervalo)
    if (intervalo !== undefined) {
        clearInterval(intervalo)
    }
    intervalo = setInterval(function () {
        adicionar_dados(idMaquina,vetor, div_grafico, myChart, myChartMedia)

    }, 2000)
    console.log(intervalo)

}

//Exibir os gráficos da máquina selecionada pelo usuário
function adicionar_dados(idMaquina,valores, div_grafico, myChart, myChartMedia) {
    var dashboard = document.getElementById(div_grafico)
    var dashboardMedia = document.getElementById(myChartMedia)
    esconder_graficos()
    var maquina = document.getElementById(idMaquina)
    maquina.addEventListener('click', operarHTML(valores))
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

