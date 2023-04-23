radio.onReceivedValue(function (name, value) {
    if (name == "D") {
        if (value >= 0) {
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            if (value == 0) {
                tiraled.showColor(neopixel.rgb(255, 255, 255))
            }
            if (value == 1) {
                tiraled.showColor(neopixel.rgb(255, 0, 0))
            }
            if (value == 2) {
                tiraled.showColor(neopixel.rgb(0, 255, 0))
            }
            if (value == 3) {
                tiraled.showColor(neopixel.rgb(0, 0, 255))
            }
        }
    }
    if (name == "E") {
        if (value == 0) {
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            tiraled.showColor(neopixel.rgb(0, 0, 0))
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
        if (value == 1) {
            anguloherramienta = anguloherramienta - 1
            if (anguloherramienta >= 5) {
                maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
            } else {
                anguloherramienta = 5
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
        if (value == 1) {
            anguloherramienta = anguloherramienta + 1
            if (anguloherramienta <= 90) {
                maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
            } else {
                anguloherramienta = 90
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
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocidad)
    } else if (ultimaorden == "JoystickAvanza") {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (xvalor >= 750 && (yvalor > 250 && yvalor < 750)) {
        ultimaorden = "JoystickDerecha"
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velocidad)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velocidad)
    } else if (ultimaorden == "JoystickDerecha") {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (yvalor <= 250 && (xvalor > 250 && xvalor < 750)) {
        ultimaorden = "JoystickRetrocede"
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velocidad)
    } else if (ultimaorden == "JoystickRetrocede") {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (xvalor <= 250 && (yvalor > 250 && yvalor < 750)) {
        ultimaorden = "JoystickIzquierda"
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velocidad)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velocidad)
    } else if (ultimaorden == "JoystickIzquierda") {
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
basic.showIcon(IconNames.Yes)
radio.setGroup(23)
velocidad = 20
angulocamara = 90
anguloherramienta = 5
maqueen.servoRun(maqueen.Servos.S1, angulocamara)
maqueen.servoRun(maqueen.Servos.S2, anguloherramienta)
tiraled = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB)
