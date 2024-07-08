const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const imgFoco = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const imgBotao = document.querySelector('.app__card-primary-butto-icon')
const musicaFocoInput = document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector("#start-pause")
const iniciarPausarbt = document.querySelector("#start-pause span")
const tempoTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioFim = new Audio('/sons/beep.mp3')
let tempoDecorridoEmSegundos = 1500
let intervaloId = null
musica.loop = true

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
}
)

focoBt.addEventListener('click', ()=>{
    alterarContexto('foco')
    focoBt.classList.add('active')
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
})

curtoBt.addEventListener('click', ()=>{
alterarContexto('descanso-curto')
curtoBt.classList.add('active')
tempoDecorridoEmSegundos = 300
mostrarTempo()
})

//primeira solução
longoBt.addEventListener('click', ()=>{
    // html.setAttribute('data-contexto', 'descanso-longo')
    // imgFoco.setAttribute('src', '/imagens/descanso-longo.png')
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
} )

startPauseBt.addEventListener('click', iniciar)

function alterarContexto(contexto){
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    imgFoco.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case 'foco':
            titulo.innerHTML =`Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case 'descanso-curto':
            titulo.innerHTML =`Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma curta pausa!</strong>`
                break;
        case 'descanso-longo':
            titulo.innerHTML =`Hora de voltar pra superfície!<br>
                <strong class="app__title-strong">Relaxe um pouco.</strong>`
                break;
        default:
            break;
    }
}
const contagemRegressiva =()=>{ 
    
tempoDecorridoEmSegundos -=1

if (tempoDecorridoEmSegundos<=0){
    audioFim.play()
    zerar()
    return
}
mostrarTempo()

}
function iniciar(){
    if(intervaloId){
            audioPause.play()
            
        zerar()

        return
    }
    audioPlay.play()
    
 intervaloId = setInterval(contagemRegressiva, 1000)
     imgBotao.setAttribute('src', '/imagens/pause.png')
    iniciarPausarbt.textContent = 'Pausar'  

}
function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    imgBotao.setAttribute('src', '/imagens/play_arrow.png')
    iniciarPausarbt.textContent = 'Continuar'  

}
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos*1000)
    const tempoFormatado = tempo.toLocaleString('pt-br',{minute:"2-digit", second:"2-digit"})
    tempoTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()