
function cadastrarMaquina() {
    var formulario = document.getElementById("ocultar")
    formulario.style.visibility = 'visible'
    formulario.style.transition = 'opacity 0.5s linear';
    formulario.style.opacity = '1';
}

//Cadastro de máquina nova (ainda não funcional)

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
function mostrar_dados_dashboard(idMaq, vetor, classe, myChart) {
    console.log(intervalo)
    if (intervalo !== undefined) {
        clearInterval(intervalo)
    }
    intervalo = setInterval(function () {
        adicionar_dados(idMaq, vetor, classe, myChart)
       
    }, 2000)
    console.log(intervalo)

}

function adicionar_dados(idMaq, vetor, classe, myChart) {
    var dashboard = document.getElementById(classe)
    esconder_graficos()
    dashboard.style.display = 'block'
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
    function addData(myChart, data) {
        myChart.data.labels.push(new Date().toLocaleTimeString())
        myChart.data.datasets[0].data.push(data[0]);
        myChart.data.datasets[0].data.push(data[1]);
        myChart.data.datasets[0].data.push(data[2]);
        myChart.data.datasets[0].data.push(data[3]);
        myChart.data.datasets[0].data.push(data[4]);
        myChart.update();
    }
    if (myChart.data.labels.length == 10) {
        myChart.data.labels.shift();
        myChart.data.datasets[0].data.shift();
    }
    myChart.update();


    function esconder_graficos() {
        document.getElementById('grafico1').style.display = 'none'
        document.getElementById('grafico2').style.display = 'none'
        document.getElementById('grafico3').style.display = 'none'
        document.getElementById('grafico4').style.display = 'none'
        document.getElementById('grafico5').style.display = 'none'
    }
}