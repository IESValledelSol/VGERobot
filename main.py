def my_function():
        pass
maqueen.lt_event(maqueen.Patrol1.PATROL_RIGHT,
        maqueen.Voltage.LOW,
        my_function)

def on_button_pressed_a():
        pass
input.on_button_pressed(Button.A, on_button_pressed_a)

def my_function2():
        pass
maqueen.lt_event(maqueen.Patrol1.PATROL_LEFT,
        maqueen.Voltage.LOW,
        my_function2)

def on_received_value(name, value):
        global velocity, angulo, yvalue, xvalue, lastorder
        if velocity > 0:
            if name == "S":
                if value == 0:
                    if velocity + 5 <= 255:
                        velocity += 5
            if name == "M":
                if value == 0:
                    if velocity - 5 >= 0:
                        velocity += -5
        if name == "U":
            if value == 0:
                pins.digital_write_pin(DigitalPin.P1, 1)
        if name == "D":
            if value == 0:
                pins.digital_write_pin(DigitalPin.P1, 0)
        if name == "R":
            if value == 0:
                angulo = angulo - 1
                if angulo >= 0:
                    pins.servo_write_pin(AnalogPin.P2, angulo)
                else:
                    angulo = 0
        if name == "L":
            if value == 0:
                angulo = angulo + 1
                if angulo <= 180:
                    pins.servo_write_pin(AnalogPin.P2, angulo)
                else:
                    angulo = 180
        if name == "Y":
            yvalue = value
        if name == "X":
            xvalue = value
        if value == 1 and lastorder == name:
            maqueen.motor_stop(maqueen.Motors.ALL)
        if yvalue >= 750 and (xvalue > 250 and xvalue < 750):
            lastorder = "JoystickAvanza"
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, velocity)
        else:
            if lastorder == "JoystickAvanza":
                maqueen.motor_stop(maqueen.Motors.ALL)
        if xvalue >= 750 and (yvalue > 250 and yvalue < 750):
            lastorder = "JoystickDerecha"
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, velocity)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, velocity)
        else:
            if lastorder == "JoystickDerecha":
                maqueen.motor_stop(maqueen.Motors.ALL)
        if yvalue <= 250 and (xvalue > 250 and xvalue < 750):
            lastorder = "JoystickRetrocede"
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, velocity)
        else:
            if lastorder == "JoystickRetrocede":
                maqueen.motor_stop(maqueen.Motors.ALL)
        if xvalue <= 250 and (yvalue > 250 and yvalue < 750):
            lastorder = "JoystickIzquierda"
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, velocity)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, velocity)
        else:
            if lastorder == "JoystickIzquierda":
                maqueen.motor_stop(maqueen.Motors.ALL)
radio.on_received_value(on_received_value)

lastorder = ""
xvalue = 0
yvalue = 0
angulo = 0
velocity = 0
radio.set_group(23)
velocity = 60
pins.servo_write_pin(AnalogPin.P2, 90)
angulo = 90
