// tests go here; this will not be compiled when this package is used as a library

//PWM fast decay control motor A forward and set speed
KS4033.PWMFast(Motor.A, 0)

//PWM slow decay control motor A forward and set speed
//KS4033.PWMSlow(Motor.A, 0)

//Control motor A forward
//KS4033.Drive(Motor.A, +1)

//Coast motor
KS4033.Coast(Motor.A)

//Brake motor
KS4033.Brake(Motor.A)
