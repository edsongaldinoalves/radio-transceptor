radio.setGroup(1)

// Função de codificação simples (Cifra de César)
function codificar(msg: string): string {
    let resultado = ""
    for (let i = 0; i < msg.length; i++) {
        let letra = msg.charCodeAt(i)
        resultado += String.fromCharCode(letra + 3) // Desloca 3 posições
    }
    return resultado
}

// Função de decodificação
function decodificar(msg: string): string {
    let resultado = ""
    for (let i = 0; i < msg.length; i++) {
        let letra = msg.charCodeAt(i)
        resultado += String.fromCharCode(letra - 3)
    }
    return resultado
}

// Botão A envia mensagem padrão codificada
input.onButtonPressed(Button.A, function () {
    let mensagem = codificar("Olá do A")
    radio.sendString(mensagem)
    basic.showString("TX A")
})

// Botão B envia mensagem alternativa codificada
input.onButtonPressed(Button.B, function () {
    let mensagem = codificar("Mensagem B")
    radio.sendString(mensagem)
    basic.showString("TX B")
})

// Recepção e resposta automática
radio.onReceivedString(function (received) {
    let mensagem = decodificar(received)
    basic.showString("RX")
    basic.showString(mensagem)

    // Resposta automática
    if (mensagem == "Olá do A") {
        radio.sendString(codificar("Oi, recebi!"))
        basic.showString("AutoResp")
    }
})

// Simulação de microfone externo via pino analógico (ex: P1)
basic.forever(function () {
    let som = pins.analogReadPin(AnalogPin.P1)
    if (som > 600) {
        radio.sendString(codificar("Som detectado"))
        basic.showString("Mic")
        basic.pause(1000)
    }
})
