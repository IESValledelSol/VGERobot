radio.onReceivedValue(function (name, value) {
    if (velocity > 0) {
        if (name == "S") {
            if (value == 0) {
                if (velocity + 5 <= 255) {
                    velocity += 5
                }
            }
        }
        if (name == "M") {
            if (value == 0) {
                if (velocity - 5 >= 0) {
                    velocity += -5
                }
            }
        }
    }
    if (name == "U") {
        if (value == 0) {
            pins.digitalWritePin(DigitalPin.P1, 1)
        }
    }
    if (name == "D") {
        if (value == 0) {
            pins.digitalWritePin(DigitalPin.P1, 0)
        }
    }
    if (name == "R") {
        if (value == 0) {
            angulo = angulo - 1
            if (angulo >= 0) {
                pins.servoWritePin(AnalogPin.P2, angulo)
            } else {
                angulo = 0
            }
        }
    }
    if (name == "L") {
        if (value == 0) {
            angulo = angulo + 1
            if (angulo <= 180) {
                pins.servoWritePin(AnalogPin.P2, angulo)
            } else {
                angulo = 180
            }
        }
    }
    if (name == "Y") {
        yvalue = value
    }
    if (name == "X") {
        xvalue = value
    }
    if (value == 1 && lastorder == name) {
        cuteBot.stopcar()
    }
    if (yvalue >= 750 && (xvalue > 250 && xvalue < 750)) {
        lastorder = "JoystickAvanza"
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velocity)
        cuteBot.motors(velocity, velocity)
    } else if (lastorder == "JoystickAvanza") {
        cuteBot.stopcar()
    }
    if (xvalue >= 750 && (yvalue > 250 && yvalue < 750)) {
        lastorder = "JoystickDerecha"
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velocity)
        cuteBot.motors(velocity, 0)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velocity)
    } else if (lastorder == "JoystickDerecha") {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (yvalue <= 250 && (xvalue > 250 && xvalue < 750)) {
        lastorder = "JoystickRetrocede"
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velocity)
    } else if (lastorder == "JoystickRetrocede") {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (xvalue <= 250 && (yvalue > 250 && yvalue < 750)) {
        lastorder = "JoystickIzquierda"
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velocity)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velocity)
    } else if (lastorder == "JoystickIzquierda") {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
let lastorder = ""
let xvalue = 0
let yvalue = 0
let angulo = 0
let velocity = 0
radio.setGroup(23)
velocity = 60
pins.servoWritePin(AnalogPin.P2, 90)
angulo = 90
