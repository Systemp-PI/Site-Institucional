var tela_cadastro = document.getElementById("formulario_maquina_nova");
var abrir_tela = document.getElementById("add_icon");
var fechar_tela = document.getElementById("exit_icon");

abrir_tela.onclick = function cadastrarMaquina() {
    tela_cadastro.style.display = "block";
}
fechar_tela.onclick = function fechar() {
    tela_cadastro.style.display = "none";
}

var temperatura_max = 0
var temperatura_alerta_quente = 0
var temperatura_ideal = 0
var temperatura_alerta_frio = 0
var temperatura_min = 0
var intervalo
function enviar_dados_maquina() {
    temperatura_max = Number(input_temperatura_max.value);
    temperatura_min = Number(input_temperatura_min.value);
}
function mostrar_dados_dashboard(idMaq, vetor, div_grafico, myChart, myChartMedia) {
    console.log(intervalo)
    if (intervalo !== undefined) {
        clearInterval(intervalo)
    }
    intervalo = setInterval(function () {
        adicionar_dados(idMaq, vetor, div_grafico, myChart, myChartMedia)
       
    }, 2000)
    console.log(intervalo)

}

function adicionar_dados(idMaq, vetor, div_grafico, myChart, myChartMedia) {
    var dashboard = document.getElementById(div_grafico)
    var dashboardMedia = document.getElementById(myChartMedia)
    esconder_graficos()
    dashboard.style.display = 'block'
    dashboardMedia.style.display = 'block'
    var maquina = document.getElementById(idMaq)
    maquina.addEventListener('click', operarHTML(vetor))

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
        myChart.update();
    }
    if (myChart.data.labels.length == 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
    }
    myChart.update();


    function esconder_graficos() {
        document.getElementById('grafico1').style.display = 'none'
        document.getElementById('graficoMedia').style.display = 'none'

    }
}

var valorTeste= 0
function addMaq(){
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    var divMaquina =document.querySelector('#maq1')
    var spanValor = document.getElementById('valorSpan')
    let cloneNomeMaq = document.querySelector('.identificacao_maq').cloneNode(true);
    spanValor.innerHTML=`Maquina ${valorTeste++}`
 divMaquina.style.backgroundColor="#" + randomColor
    // remover o id, senão você terá mais de um elemento com o mesmo id
    document.querySelector('#container_redutores').appendChild(cloneNomeMaq);

}