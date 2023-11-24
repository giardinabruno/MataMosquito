// *** Declaracoes Iniciais ****
var altura = 0 //tela
var largura = 0 //tela
var vidas = 1 //variavel que ira concatenar e diminuir o numero de vidas.
var tempo = 15 //variavel que ira controlar o tempo em segundos.

// *** Controle de nivel / tempo ***
var criaMosquitoTempo = 1500 //variavel para auxiliar na declaracao de tempo a partir do nivel escolhido

var nivel = window.location.search //declara como valor de variavel o destino localizado. o atributo search retorna tudo que estiver apos o ? no endereco recuperado.
nivel = nivel.replace('?', '') //.replace('?', '') serve para substituir o primeiro item pelo segundo. estamos atribuindo a variavel agora sem o ?

if(nivel === 'normal') { //varificacao de nivel e inclusao de tempo a partir do nivel comparado.
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000
} else if (nivel === 'chucknorris') {
    criaMosquitoTempo = 750
}

// *** Tela / Jogo ***
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight//resgata a altura da tela
    largura = window.innerWidth//resgata a largura da tela
    
    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro) //para o cronometro quando chegar a 0.
        clearInterval(criaMosca) //pausa a criacao de moscas quando zerar o cronometro e dar vitoria.
        window.location.href = 'vitoria.html'
    } else {
    document.getElementById('cronometro').innerHTML = tempo //innerHTML e o valor contido entre as tags do elemento html indicado no id do DOM.
    }
}, 1000)

function posicaoRandomica() { //funcao chamada no arquivo html para gerar o mosquito randomicamente.

    //remover o mosquito anterior, caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas >= 3) { //analise de condicao se o numero de vidas for menor que 3 para interromper o jogo e dar game over.
            window.location.href = 'fim_de_jogo.html'
        } else {
        document.getElementById('v' + vidas).src="imagens/coracao_vazio.png" //recurso para diminuir as vidas quando nao clicar na mosca.
        vidas++ //incremento para concatenacao.
        }
    }
    
    var posicaoX = Math.floor(Math.random() * largura) - 90 //gerar randomicamente uma posicao dentro dos valores de altura e largura estipulados para a pagina. math.floor arredonda para baixo os valores, tirando as casas decimais.
    var posicaoY = Math.floor(Math.random() * altura) - 90 //decrementa 90 pois como a imagem tem 50px de largura e altura, caso o random pare proximo a borda da tela, somando a largura ou altura da imagem, vai passar do limite da tela. com o decremento de 90, vai diminuir o limite maximo de tela em 90.

    posicaoX = posicaoX < 0 ? 0 : posicaoX //usado para impedir que o objeto saia a tela devido ao decremento de 90 do random.
    posicaoY = posicaoY < 0 ? 0 : posicaoY // operador ternario.

    console.log(posicaoX, posicaoY)

    //***criar o elemento html***
    var mosquito = document.createElement('img') //cria um elemento img.
    mosquito.src = 'imagens/mosca.png' //adicionando a imagem utilizando o atributo src.
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //resgatando a class criada no arquivo estilo.css e suas propriedades. Atentar para concatenar um espaco antes de add a funcao de mudar orientacao que complementara o random.
    mosquito.style.left = posicaoX + 'px' //criar o mosquito a partir das posicoes geradas randomicamentes.
    mosquito.style.top = posicaoY + 'px' //px de pixel, para os posicionamentos a partir do style.
    mosquito.style.position = 'absolute' //position absolute para aplicar as posicoes indicadas.
    mosquito.id = 'mosquito' //id criado para verificacao e remocao de mosquitos na tela criados com o uso do comando setInterval no arquivo html.
    mosquito.onclick = function() {//funcao para remover o mosquito ao ser clicado
        this.remove()
    }

    document.body.appendChild(mosquito) //acessa o elemento body e cria um filho
}

function tamanhoAleatorio() { //funcao para gerar tamanhos aleatorios, a partir das classes criadas no arquivo css, sera chamada na funcao de posicao randomica no atributo de mosquito.className.
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
                return 'mosquito1'
        case 1:
                return 'mosquito2'
        case 2:
                return'mosquito3'
    }
}

function ladoAleatorio() { //funcao para gerar orientacao aleatoria do mosquito (direita ou esquerda).
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
                return 'ladoA'
        case 1:
                return 'ladoB'
    }
}

