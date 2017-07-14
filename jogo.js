//variavel que armazena a chama a funcção timeout
var timeId = null;

function iniciaJogo(){
    //recuperando apenas o final da url da pag index do jogo
    var url = window.location.search;
    
    // tirando a string que vem junto com o valor do select
    var nivelJogo = url.replace("?","");
    
    //definindo o tempo por deficildade do jogo
    var tempSeg = 0;
    var qtdbaloes = 0;
    
    if(nivelJogo == 1){
        tempSeg = 120;
         qtdbaloes = 80;
    }
    
    if(nivelJogo == 2){
        tempSeg = 60;
        qtdbaloes = 70;
    }
    
    if(nivelJogo == 3){
        tempSeg = 5;
        qtdbaloes = 60;
    }
    
    //inserindo o seg no span
    document.getElementById('tempoSeg').innerHTML = tempSeg;
    
    //variavel com quantidade de balões
    //var qtdbaloes = 20;
    
    // passando a quantidade de balões para a função
    criaBalao(qtdbaloes);
    
    //imprimindo qtd de baloes inteiros e estourados
    document.getElementById('balaoInteiro').innerHTML = qtdbaloes;
    document.getElementById('balaoEstourado').innerHTML = 0;
    
    cronometro(tempSeg +1);    
}

function cronometro(seg){
    
    seg = seg -1;
    
    if(seg == -1){
        clearTimeout(timeId);
        gameOver();
        return false;
    }
    
    document.getElementById('tempoSeg').innerHTML = seg;
    timeId = setTimeout("cronometro("+seg+")",1000);        
}

function criaBalao(quantidade){
    for(var i = 1; i <= quantidade; i++){
        //criando um tag img com o src para a imagem 
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.id = 'img'+i;
        
        balao.onclick = function(){pow(this)};
        
        //inserindo as imagem como filho da div 
        document.getElementById('cenario').appendChild(balao);
    }
}

function pow(e){
    var idBalao = e.id;
    document.getElementById(idBalao).setAttribute("onclick","");
    document.getElementById(idBalao).src ='imagens/balao_azul_pequeno_estourado.png'; 
    pontuacao(-1);
}

function pontuacao(acao){
    //variavel recebendo os valores dos span
    var balaoInteiro = document.getElementById('balaoInteiro').innerHTML;
    var balaoEstourado = document.getElementById('balaoEstourado').innerHTML;
    
    //convertendo para inteiro
    balaoInteiro = parseInt(balaoInteiro);
    balaoEstourado = parseInt(balaoEstourado);
    
    balaoInteiro = balaoInteiro + acao;
    balaoEstourado = balaoEstourado - acao;
    
    document.getElementById('balaoInteiro').innerHTML = balaoInteiro;
    document.getElementById('balaoEstourado').innerHTML = balaoEstourado;
    
    winner(balaoInteiro);

}

function winner(bl){
    if(bl == 0){
        stopTime();
        alert('parabéns você venceu!!');    
    }
}

function removeOnlick(){
    
    var i = 1;
    
    while(document.getElementById( 'img'+i)){
        document.getElementById('img'+i).onclick = '';
        i++;
    }
}
function gameOver(){
    removeOnlick();
    alert('Fim de jogo você perdeu!!!');
}

function stopTime(){
    clearTimeout(timeId);
}







