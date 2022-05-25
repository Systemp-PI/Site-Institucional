
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


function listarMaquinas() {

    console.log('teste')
    fetch(`/maquina/listarUm/${idMaquina}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(function (resposta) {

        if (resposta.ok) {
            console.log("resposta: ", resposta.json());
            console.log("resposta: ", resposta.json().idmaquina);
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log("#ERRO: "`${resposta}`);
    });
}
fetch("/maquina/listar", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
}).then(function (resposta) {


    // console.log("resposta: ", resposta.json());
    resposta.json().then(function (resultado) {
        console.log('Esta maquina tem temp min::' + resultado[0, 2].temp_min)
        var el = document.getElementById('container_redutores');

        for (var i = 0; i < resultado.length; i++) {
            clonar(resposta.nome_maquina, `maquina${i}`)
            console.log(resultado[i, i].nome_maquina + "temp_min:" + resultado[i, i].temp_min, +"temp_max:" + resultado[i, i].temp_max)
            spanValor.innerHTML = resultado[i, i].nome_maquina;
            
        }
        el.addEventListener('click', function (ident) {
            myDynamicChart(resultado[0,0].nome_maquina)
            operarHTML([resultado[5,5].temp_min,resultado[0,0].temp_min - 5,resultado[0,0].temp_min-2, resultado[0,0].temp_min-300,resultado[0,0].temp_max])
            console.log(ident.target.id)
        })
        var dynamic_chart; 
        var ctx2; 
           // pass the chart that we want to clone as an object 
        
           function myDynamicChart(chart){
            const datateste = {
              labels: labels2,
              datasets: [{
                label: `${chart}`,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [1, 20, 30, 40,52 , 23],
              },
              
                {label: 'Sensor saída',
                backgroundColor: 'dodgerblue',
                borderColor: 'dodgerblue',
                data: [20, 32,20, 55,30 , 13],
              }]};
           //destroy the previous chart in the canvas to avoid any overlapping 
        
           if (Chart.getChart("myChart")){
            Chart.getChart("myChart").destroy();
          }
        
           //set the context jquery..
             ctx2 = document.querySelectorAll('#myChart');
        
           //or set the conext by html which will be ctx= document.getElementById("myBarChart3");
        
           //instantiate the chart 
             dynamic_chart = new Chart(ctx2,{
                type: 'line',
                data: datateste,
                options: {}
           });
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

function operarHTML(valores) {
    span_m_baixa.innerHTML = valores[0] + "°C"
    span_baixa.innerHTML = valores[1] + "°C"
    span_ideal.innerHTML = valores[2] + "°C"
    span_alta.innerHTML = valores[3] + "°C"
    span_m_alta.innerHTML = valores[4] + "°C"
    addData(myChart, [valores, 40.5, 45, 43,valores])
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function myDynamicChart2(chart) {
    const datateste = {
        labels: labels,
        datasets: [{
            label: 'Maquina 2',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [6, 10, 10, 6, 10],
        }]
    }
    //destroy the previous chart in the canvas to avoid any overlapping 

    if (Chart.getChart("myChart1")) {
        Chart.getChart("myChart1").destroy();
    }

    //set the context jquery..
    ctx2 = document.querySelectorAll('#myChart1');

    //or set the conext by html which will be ctx= document.getElementById("myBarChart3");

    //instantiate the chart 
    dynamic_chart2 = new Chart(ctx, {
        type: 'line',
        data: datateste,
        options: {}
    });



}
function myDynamicChart3(chart) {
    const datateste = {
        labels: labels,
        datasets: [{
            label: 'Maquina 1',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [10, 20, 30, 40, 50],
        }]
    }
    //destroy the previous chart in the canvas to avoid any overlapping 

    if (Chart.getChart("myChart1")) {
        Chart.getChart("myChart1").destroy();
    }

    //set the context jquery..
    ctx3 = document.querySelectorAll('#myChart1');

    //or set the conext by html which will be ctx= document.getElementById("myBarChart3");

    //instantiate the chart 
    dynamic_chart3 = new Chart(ctx, {
        type: 'line',
        data: datateste,
        options: {}
    });

}
function myDynamicChart4(chart) {
    const datateste = {
        labels: labels,
        datasets: [{
            label: `${params}`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [20, 40, 20, 50, 10],
        }]
    }
    if (Chart.getChart("myChart1")) {
        Chart.getChart("myChart1").destroy();
    }
    ctx4 = document.querySelectorAll('#myChart1');
    dynamic_chart4 = new Chart(ctx, {
        type: 'line',
        data: datateste,
        options: {}
    });



}