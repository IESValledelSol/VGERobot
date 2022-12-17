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
    if (name == "D") {
        if (value >= 0) {
            if (value == 0) {
                strip.showColor(neopixel.rgb(255, 255, 255))
            }
            if (value == 1) {
                strip.showColor(neopixel.rgb(255, 0, 0))
            }
            if (value == 2) {
                strip.showColor(neopixel.rgb(0, 255, 0))
            }
            if (value == 3) {
                strip.showColor(neopixel.rgb(0, 0, 255))
            }
        }
    }
    if (name == "E") {
        if (value == 0) {
            strip.showColor(neopixel.rgb(0, 0, 0))
        }
    }
    if (name == "F") {
        if (value == 0) {
            angulo = angulo - 1
            if (angulo >= 0) {
                cuteBot.setServo(cuteBot.ServoList.S1, angulo)
            } else {
                angulo = 0
            }
        }
    }
    if (name == "C") {
        if (value == 0) {
            angulo = angulo + 1
            if (angulo <= 180) {
                cuteBot.setServo(cuteBot.ServoList.S1, angulo)
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
        cuteBot.motors(velocity, velocity)
    } else if (lastorder == "JoystickAvanza") {
        cuteBot.stopcar()
    }
    if (xvalue >= 750 && (yvalue > 250 && yvalue < 750)) {
        lastorder = "JoystickDerecha"
        cuteBot.motors(-1 * velocity, velocity)
    } else if (lastorder == "JoystickDerecha") {
        cuteBot.stopcar()
    }
    if (yvalue <= 250 && (xvalue > 250 && xvalue < 750)) {
        lastorder = "JoystickRetrocede"
        cuteBot.motors(-1 * velocity, -1 * velocity)
    } else if (lastorder == "JoystickRetrocede") {
        cuteBot.stopcar()
    }
    if (xvalue <= 250 && (yvalue > 250 && yvalue < 750)) {
        lastorder = "JoystickIzquierda"
        cuteBot.motors(velocity, -1 * velocity)
    } else if (lastorder == "JoystickIzquierda") {
        cuteBot.stopcar()
    }
})
let lastorder = ""
let xvalue = 0
let yvalue = 0
let strip: neopixel.Strip = null
let angulo = 0
let velocity = 0
radio.setGroup(23)
velocity = 20
angulo = 90
cuteBot.setServo(cuteBot.ServoList.S1, 90)
strip = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB)
