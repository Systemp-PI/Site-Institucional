
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
function enviar_dados_maquina() {
    temperatura_max = Number(input_temperatura_max.value);
    temperatura_min = Number(input_temperatura_min.value);
}
function mostrar_dados_dashboard(idMaq, vetor,classe,myChart) {
    var dashboard = document.getElementById(classe)
    dashboard.style.display = 'block'
    var maquina = document.getElementById(idMaq)
    maquina.addEventListener('click', operarHTML(vetor))
    function operarHTML(valores) {
        span_m_baixa.innerHTML = valores[0] + "°C"
        span_baixa.innerHTML = valores[1] + "°C"
        span_ideal.innerHTML = valores[2] + "°C"
        span_alta.innerHTML = valores[3] + "°C"
        span_m_alta.innerHTML = valores[4] + "°C"
        addData(myChart,[37.8,37.9,38,38.2,38.5])
    }
    function addData(myChart,data) {
       myChart.data.labels.push(new Date().toLocaleTimeString())
       myChart.data.datasets[0].data.push(data[0]);
       myChart.data.datasets[0].data.push(data[1]);
       myChart.data.datasets[0].data.push(data[2]);
       myChart.data.datasets[0].data.push(data[3]);
       myChart.data.datasets[0].data.push(data[4]);
       myChart.update();
    }
}
