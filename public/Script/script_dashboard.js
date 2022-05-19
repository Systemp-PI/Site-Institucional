
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
    var nome_maquina_card = sessionStorage.NOME_MAQUINA_DIV

    fetch("/maquina/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {



        // console.log("resposta: ", resposta.json());
        resposta.json().then(function (resultado) {
            console.log('Esta maquina tem temp min::' + resultado[0, 2].temp_min)

            for (var i = 0; i < resultado.length; i++) {
                clonar(resposta.nome_maquina)
                console.log(resultado[i, i].nome_maquina+"temp_min:"+resultado[i, i].temp_min,+"temp_max:"+resultado[i, i].temp_max)
                spanValor.innerHTML = resultado[i, i].nome_maquina;

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

{/* <ul id="fora">
    <li id="dentro1">aaaaaa</li>
    <li id="dentro2">aaaaaa</li>
    <li id="dentro3">aaaaaa</li>
</ul>
var el = document.getElementById('fora');
el.addEventListener('click', function(e) {
    alert(e.target.id);
}); */}