# Botão A envia mensagem padrão codificada

def on_button_pressed_a():
    global mensagem
    datalogger.log(datalogger.create_cv("dados1", 0),
        datalogger.create_cv("dados2", 0))
    mensagem = codificar("Olá do Amigo")
    radio.send_string(mensagem)
    basic.show_string("TX Amigo")
input.on_button_pressed(Button.A, on_button_pressed_a)

# Recepção e resposta automática

def on_received_string(received):
    global mensagem3
    mensagem3 = decodificar(received)
    basic.show_string("RX")
    basic.show_string(mensagem3)
    # Resposta automática
    if mensagem3 == "Olá do A":
        radio.send_string("" + (codificar("Oi, recebi!")))
        basic.show_string("AutoResp")
radio.on_received_string(on_received_string)

# Função de decodificação
def decodificar(msg: str):
    global letra2, resultado2
    j = 0
    while j <= len(msg) - 1:
        letra2 = msg.char_code_at(j)
        resultado2 = "" + resultado2 + String.from_char_code(letra2 - 3)
        j += 1
    return resultado2
# Função de codificação simples (Cifra de César)
def codificar(msg2: str):
    global letra, resultado
    i = 0
    while i <= len(msg2) - 1:
        letra = msg2.char_code_at(i)
        # Desloca 3 posições
        resultado = "" + resultado + String.from_char_code(letra + 3)
        i += 1
    return resultado
# Botão B envia mensagem alternativa codificada

def on_button_pressed_b():
    global mensagem2
    datalogger.log(datalogger.create_cv("dados2", 0),
        datalogger.create_cv("dados1", 0))
    mensagem2 = codificar("Mensagem B")
    radio.send_string(mensagem2)
    basic.show_string("TX B")
input.on_button_pressed(Button.B, on_button_pressed_b)

som = 0
mensagem2 = ""
resultado = ""
letra = 0
resultado2 = ""
letra2 = 0
mensagem3 = ""
mensagem = ""
radio.set_group(1)
# Simulação de microfone externo via pino analógico (ex: P1)

def on_forever():
    global som
    som = pins.analog_read_pin(AnalogPin.P1)
    if som > 600:
        radio.send_string("" + (codificar("Som detectado")))
        basic.show_string("Mic")
        basic.pause(1000)
basic.forever(on_forever)
