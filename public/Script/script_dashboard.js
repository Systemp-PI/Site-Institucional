
function cadastrarMaquina(){
 var formulario = document.getElementById("ocultar") 
 formulario.style.visibility='visible'
 formulario.style.transition='opacity 0.5s linear';
 formulario.style.opacity='1';
}

//Cadastro de máquina nova (ainda não funcional)

var temperatura_max = 0;
var temperatura_min = 0;
function enviar_dados_maquina() {
    temperatura_max = Number(input_temperatura_max.value);
    temperatura_min = Number(input_temperatura_min.value);
}

//Apresentar valores de temperatura nos quadros coloridos

var maquina = "";
function apresentar_dados() {
    maquina = select_maquina.value;

    if (maquina == "maq_01") {
        temperatura_max = 40;
        temperatura_min = 20;
        alterar_temperatura()
    }
    else if (maquina == "maq_02") {
        temperatura_max = 35;
        temperatura_min = 15;
        alterar_temperatura()
    }
    else if (maquina == "maq_03") {
        temperatura_max = 38;
        temperatura_min = 23;
        alterar_temperatura()
    }
    else {
        span_m_baixa.innerHTML = "";
        span_baixa.innerHTML = "";
        span_ideal.innerHTML = "";
        span_alta.innerHTML = "";
        span_m_alta.innerHTML = "";
    }
}

//Calcular valores inseridos na function enviar_dados_maquina()

function alterar_temperatura() {
    span_m_baixa.innerHTML = temperatura_min + "°C";
    span_baixa.innerHTML = (temperatura_min + 3) + "°C";
    span_ideal.innerHTML = ((temperatura_max + temperatura_min) / 2) + "°C";
    span_alta.innerHTML = (temperatura_max - 3) + "°C";
    span_m_alta.innerHTML = temperatura_max + "°C";
}