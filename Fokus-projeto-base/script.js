const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFoco = document.querySelector('#alternar-musica')
const iniciarBt = document.querySelector('#start-pause span')
const tempoTela = document.querySelector('#timer')
const startPauseBt = document.querySelector('#start-pause')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav')
const audioPausa = new Audio('/sons/pause.mp3')
const audioAcabou = new Audio('/sons/beep.mp3')
musica.loop = true

let tempoSegundos = 1500
let intervaloId = null

musicaFoco.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoSegundos = 1500
    alterarContexto('nanami focus')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoSegundos = 300
   alterarContexto('nanami curto')
   curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoSegundos = 900
    alterarContexto('nanami longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "nanami focus":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            
            break;
        case "nanami curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "nanami longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa!</strong>
            `
    
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoSegundos <= 0) {
        audioAcabou.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciar)

function iniciar() {
    if(intervaloId) {
        audioPausa.play()
        zerar()
        return 
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva , 1000)
    iniciarBt.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId)
    iniciarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()