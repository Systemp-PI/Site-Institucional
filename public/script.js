function calcula_perda() {
    var lucro_medio_maquina = Number(input_lucro_medio_maquina.value);
    var total_maquinas = Number(input_total_maquinas.value);
    var maquinas_off = Number(input_maquinas_off.value);
    var horas_off = Number(input_horas_off.value);

    var lucro_total = lucro_medio_maquina * total_maquinas * horas_off;
    var perda_total = lucro_medio_maquina * maquinas_off * horas_off;

    var porcentagem_perda = (perda_total * 100) / lucro_total;

    if (maquinas_off > total_maquinas) {
        mensagem.style.marginLeft='30%'
       mensagem.innerHTML='Você tem mais máquinas quebradas<br> do que máquinas totais.'
        
    }
    if (document.getElementById("input_lucro_medio_maquina").value == '') {
        document.getElementById("error_lucro_medio").style.color = 'darkred'
        document.getElementById("input_lucro_medio_maquina").focus()
    }
    else {
        document.getElementById("error_lucro_medio").style.color = 'rgba(129, 11, 11, 0)'
    }
    if (document.getElementById("input_total_maquinas").value == '') {
        document.getElementById("error_total_maq").style.color = 'darkred'
        document.getElementById("input_total_maquinas").focus()
    }
    else {
        document.getElementById("error_total_maq").style.color = 'rgba(129, 11, 11, 0)'
    }
    if (document.getElementById("input_maquinas_off").value == '') {
        document.getElementById("error_maq_off").style.color = 'darkred'
        document.getElementById("input_maquinas_off").focus()
    }
    else {
        document.getElementById("error_maq_off").style.color = 'rgba(129, 11, 11, 0)'
    }

    if (document.getElementById("input_horas_off").value == '') {
        document.getElementById("error_hr_off").style.color = 'darkred'
        document.getElementById("input_horas_off").focus()
    }
    else {
        document.getElementById("error_hr_off").style.color = 'rgba(129, 11, 11, 0)'
    }

    if (lucro_medio_maquina != '' && total_maquinas != '' && maquinas_off != '' && maquinas_off <= total_maquinas && horas_off != '') {
        mensagem.innerHTML = `O valor perdido será de ${perda_total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })},
     equivalente a ${porcentagem_perda.toFixed(1)}
     % <br>da renda da indústria durante as horas em manutenção.`
    }

}

