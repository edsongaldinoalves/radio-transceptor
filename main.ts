//  Botão A envia mensagem padrão codificada
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    datalogger.log(datalogger.createCV("dados1", 0), datalogger.createCV("dados2", 0))
    mensagem = codificar("Olá do Amigo")
    radio.sendString(mensagem)
    basic.showString("TX Amigo")
})
//  Recepção e resposta automática
radio.onReceivedString(function on_received_string(received: string) {
    
    mensagem3 = decodificar(received)
    basic.showString("RX")
    basic.showString(mensagem3)
    //  Resposta automática
    if (mensagem3 == "Olá do A") {
        radio.sendString("" + codificar("Oi, recebi!"))
        basic.showString("AutoResp")
    }
    
})
//  Função de decodificação
function decodificar(msg: string): string {
    
    let j = 0
    while (j <= msg.length - 1) {
        letra2 = msg.charCodeAt(j)
        resultado2 = "" + resultado2 + String.fromCharCode(letra2 - 3)
        j += 1
    }
    return resultado2
}

//  Função de codificação simples (Cifra de César)
function codificar(msg2: string): string {
    
    let i = 0
    while (i <= msg2.length - 1) {
        letra = msg2.charCodeAt(i)
        //  Desloca 3 posições
        resultado = "" + resultado + String.fromCharCode(letra + 3)
        i += 1
    }
    return resultado
}

//  Botão B envia mensagem alternativa codificada
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    datalogger.log(datalogger.createCV("dados2", 0), datalogger.createCV("dados1", 0))
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
//  Simulação de microfone externo via pino analógico (ex: P1)
basic.forever(function on_forever() {
    
    som = pins.analogReadPin(AnalogPin.P1)
    if (som > 600) {
        radio.sendString("" + codificar("Som detectado"))
        basic.showString("Mic")
        basic.pause(1000)
    }
    
})
