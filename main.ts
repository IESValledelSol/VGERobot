radio.onReceivedValue(function (name, value) {
    if (name == "Q") {
        if (value == 0) {
            maqueen.servoRun(maqueen.Servos.S1, 90)
            angulocamara = 90
        }
    }
    if (name == "D") {
        if (value == 0) {
            anguloherramienta = anguloherramienta - 1
            if (anguloherramienta >= minanguloherramienta) {
                maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
            } else {
                anguloherramienta = minanguloherramienta
            }
        }
    }
    if (name == "E") {
        if (value == 0) {
            anguloherramienta = anguloherramienta + 1
            if (anguloherramienta <= maxanguloherramienta) {
                maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
            } else {
                anguloherramienta = maxanguloherramienta
            }
        }
    }
    if (name == "F") {
        if (value == 0) {
            angulocamara = angulocamara - 1
            if (angulocamara >= 0) {
                maqueen.servoRun(maqueen.Servos.S1, angulocamara)
            } else {
                angulocamara = 0
            }
        }
    }
    if (name == "C") {
        if (value == 0) {
            angulocamara = angulocamara + 1
            if (angulocamara <= 180) {
                maqueen.servoRun(maqueen.Servos.S1, angulocamara)
            } else {
                angulocamara = 180
            }
        }
    }
    if (name == "Y") {
        yvalor = value
    }
    if (name == "X") {
        xvalor = value
    }
    if (value == 1 && ultimaorden == name) {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (yvalor >= 750 && (xvalor > 250 && xvalor < 750)) {
        ultimaorden = "JoystickAvanza"
        tiraled.showColor(neopixel.rgb(255, 255, 255))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
    } else if (ultimaorden == "JoystickAvanza") {
        tiraled.showColor(neopixel.rgb(0, 0, 0))
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (xvalor >= 750 && (yvalor > 250 && yvalor < 750)) {
        ultimaorden = "JoystickDerecha"
        tiraled.showColor(neopixel.rgb(0, 255, 0))
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velocidad)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velocidad)
    } else if (ultimaorden == "JoystickDerecha") {
        tiraled.showColor(neopixel.rgb(0, 0, 0))
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (yvalor <= 250 && (xvalor > 250 && xvalor < 750)) {
        ultimaorden = "JoystickRetrocede"
        tiraled.showColor(neopixel.rgb(255, 0, 0))
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velocidad)
    } else if (ultimaorden == "JoystickRetrocede") {
        tiraled.showColor(neopixel.rgb(0, 0, 0))
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (xvalor <= 250 && (yvalor > 250 && yvalor < 750)) {
        ultimaorden = "JoystickIzquierda"
        tiraled.showColor(neopixel.rgb(0, 0, 255))
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velocidad)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velocidad)
    } else if (ultimaorden == "JoystickIzquierda") {
        tiraled.showColor(neopixel.rgb(0, 0, 0))
        maqueen.motorStop(maqueen.Motors.All)
    }
})
let ultimaorden = ""
let xvalor = 0
let yvalor = 0
let tiraled: neopixel.Strip = null
let anguloherramienta = 0
let angulocamara = 0
let velocidad = 0
let minanguloherramienta = 0
let maxanguloherramienta = 0
basic.showIcon(IconNames.Yes)
radio.setGroup(23)
maxanguloherramienta = 40
minanguloherramienta = 5
velocidad = 20
angulocamara = 90
anguloherramienta = minanguloherramienta
maqueen.servoRun(maqueen.Servos.S1, angulocamara)
maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
tiraled = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB)
