//trabalhar com eventos

//propriedades
let botao1 =document.getElementById("botao1");

//manipuladores de eventos


botao1.onclick = function(){
alert("Primeiro de evento")
};

//segundaacao
botao1.onclick = function(){
    botao1textContent = "texto alterado"
};

let botao2 = document.getElementById("botao2");
botao2.nmouseover = function(){
    botao2.attributeStyleMap.backgroundColor = "red";

    //voltar a cor original do botao
    botao2.onmouseout = function(){
        botao2.style.backgroundColor ="";
    }
};