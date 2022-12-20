radio.onReceivedValue(function (name, value) {
    if (name == "D") {
        if (value >= 0) {
            if (value == 0) {
                strip.showColor(neopixel.rgb(255, 255, 255))
                cuteBot.singleheadlights(cuteBot.RGBLights.ALL, 255, 255, 255)
            }
            if (value == 1) {
                strip.showColor(neopixel.rgb(255, 0, 0))
                cuteBot.singleheadlights(cuteBot.RGBLights.ALL, 255, 0, 0)
            }
            if (value == 2) {
                strip.showColor(neopixel.rgb(0, 255, 0))
                cuteBot.singleheadlights(cuteBot.RGBLights.ALL, 0, 255, 0)
            }
            if (value == 3) {
                strip.showColor(neopixel.rgb(0, 0, 255))
                cuteBot.singleheadlights(cuteBot.RGBLights.ALL, 0, 0, 255)
            }
        }
    }
    if (name == "E") {
        if (value == 0) {
            strip.showColor(neopixel.rgb(0, 0, 0))
            cuteBot.singleheadlights(cuteBot.RGBLights.ALL, 0, 0, 0)
        }
    }
    if (name == "F") {
        if (value == 0) {
            cameraangle = cameraangle - 1
            if (cameraangle >= 0) {
                cuteBot.setServo(cuteBot.ServoList.S1, cameraangle)
            } else {
                cameraangle = 0
            }
        }
        if (value == 1) {
            toolangle = toolangle - 1
            if (toolangle >= 5) {
                cuteBot.setServo(cuteBot.ServoList.S2, toolangle)
            } else {
                toolangle = 5
            }
        }
    }
    if (name == "C") {
        if (value == 0) {
            cameraangle = cameraangle + 1
            if (cameraangle <= 180) {
                cuteBot.setServo(cuteBot.ServoList.S1, cameraangle)
            } else {
                cameraangle = 180
            }
        }
        if (value == 1) {
            toolangle = toolangle + 1
            if (toolangle <= 90) {
                cuteBot.setServo(cuteBot.ServoList.S2, toolangle)
            } else {
                toolangle = 90
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
let toolangle = 0
let cameraangle = 0
let velocity = 0
basic.showIcon(IconNames.Yes)
radio.setGroup(23)
velocity = 20
cameraangle = 90
toolangle = 5
cuteBot.setServo(cuteBot.ServoList.S1, 90)
cuteBot.setServo(cuteBot.ServoList.S2, 5)
strip = neopixel.create(DigitalPin.P1, 8, NeoPixelMode.RGB)
