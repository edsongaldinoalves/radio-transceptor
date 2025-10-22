// Botão A envia mensagem padrão codificada
input.onButtonPressed(Button.A, function () {
    mensagem = codificar("Olá do A")
    radio.sendString(mensagem)
    basic.showString("TX A")
})
// Recepção e resposta automática
radio.onReceivedString(function (received) {
    mensagem3 = decodificar(received)
    basic.showString("RX")
    basic.showString(mensagem3)
    // Resposta automática
    if (mensagem3 == "Olá do A") {
        radio.sendString("" + (codificar("Oi, recebi!")))
        basic.showString("AutoResp")
    }
})
// Função de decodificação
function decodificar(msg: string) {
    for (let j = 0; j <= msg.length - 1; j++) {
        letra2 = msg.charCodeAt(j)
        resultado2 = "" + resultado2 + String.fromCharCode(letra2 - 3)
    }
    return resultado2
}
// Função de codificação simples (Cifra de César)
function codificar(msg: string) {
    for (let i = 0; i <= msg.length - 1; i++) {
        letra = msg.charCodeAt(i)
        // Desloca 3 posições
        resultado = "" + resultado + String.fromCharCode(letra + 3)
    }
    return resultado
}
// Botão B envia mensagem alternativa codificada
input.onButtonPressed(Button.B, function () {
    mensagem2 = codificar("Mensagem B")
    radio.sendString(mensagem2)
    basic.showString("TX B")
})
let som = 0
let mensagem2 = ""
let resultado = ""
let letra = 0
let resultado2 = ""
let letra2 = 0
let mensagem3 = ""
let mensagem = ""
radio.setGroup(1)
// Simulação de microfone externo via pino analógico (ex: P1)
basic.forever(function () {
    som = pins.analogReadPin(AnalogPin.P1)
    if (som > 600) {
        radio.sendString("" + (codificar("Som detectado")))
        basic.showString("Mic")
        basic.pause(1000)
    }
})