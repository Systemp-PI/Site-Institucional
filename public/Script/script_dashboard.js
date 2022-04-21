
function cadastrarMaquina(){
 var formulario = document.getElementById("ocultar") 
 formulario.style.visibility='visible'
 formulario.style.transition='opacity 0.5s linear';
 formulario.style.opacity='1';
}

//Cadastro de máquina nova (ainda não funcional)

var temperatura_max = 0
var temperatura_alerta_quente=0
var temperatura_ideal=0
var temperatura_alerta_frio=0
var temperatura_min = 0
function enviar_dados_maquina() {
    temperatura_max = Number(input_temperatura_max.value);
    temperatura_min = Number(input_temperatura_min.value);
}

function mostrar_dados_dashboard(){
    var maquina1= document.getElementById('maq1')
    var maquina2= document.getElementById('maq2')
    var maquina3= document.getElementById('maq3')
    var maquina4= document.getElementById('maq4')
    var maquina5= document.getElementById('maq5')
    maquina1.addEventListener('click', ()=>{ span_m_baixa.innerHTML = 35
        span_baixa.innerHTML = 37.50+"°C"
        span_ideal.innerHTML = 40+"°C"
        span_alta.innerHTML = 42.50+"°C"
        span_m_alta.innerHTML = 45+"°C"
        myChart.addData([2], label )
        myChart.addData([3], label )
        myChart.addData([4], label )
        myChart.addData([5], label )
        myChart.addData([5], label )
        myChart.update( )
    });
    maquina2.addEventListener('click',()=>{
        span_m_baixa.innerHTML = 30+"°C"
    span_baixa.innerHTML = 32.50+"°C"
    span_ideal.innerHTML = 35+"°C"
    span_alta.innerHTML = 37.50+"°C"
    span_m_alta.innerHTML = 40+"°C"
    });
    maquina3.addEventListener('click',()=>{
        span_m_baixa.innerHTML = 40+"°C"
        span_baixa.innerHTML = 42+"°C"
        span_ideal.innerHTML = 44+"°C"
        span_alta.innerHTML = 46+"°C"
        span_m_alta.innerHTML = 48  +"°C"
    });
    maquina4.addEventListener('click',()=>{
        span_m_baixa.innerHTML = 32+"°C"
        span_baixa.innerHTML = 35+"°C"
        span_ideal.innerHTML = 38+"°C"
        span_alta.innerHTML = 41+"°C"
        span_m_alta.innerHTML = 44+"°C"
    });
    maquina5.addEventListener('click',()=>{
        span_m_baixa.innerHTML = 30+"°C"
        span_baixa.innerHTML = 34+"°C"
        span_ideal.innerHTML = 38+"°C"
        span_alta.innerHTML = 42+"°C"
        span_m_alta.innerHTML = 46+"°C"
    });
 
}
