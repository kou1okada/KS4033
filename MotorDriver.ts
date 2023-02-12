enum Motor {
    //% block="A"
    A = 0x1,
    //% block="B"
    B = 0x2,
}

enum Dir {
    //% block="Forward"
    forward = 0x1,
    //% block="Backward"
    backward = 0x2,
}

//% weight=20 color=#3333FF icon="\uf1b9"
namespace KS4033 {
    
    const PWMA1 = AnalogPin.P13;
    const PWMA2 = AnalogPin.P12;
    const A1    = DigitalPin.P13;
    const A2    = DigitalPin.P12;
    const PWMB1 = AnalogPin.P16;
    const PWMB2 = AnalogPin.P15;
    const B1    = DigitalPin.P16;
    const B2    = DigitalPin.P15;

    let PWMPriod = 10000;

    /**
     * PWM Period
     * @param period [10-1000000] PWM period [micro sec]
     */
    //% blockId=KS4033_PWMPeriod block="PWM Period %period μs"
    //% weight=100
    //% period.min=10 period.max=1000000
    export function PWMPeriod(period: number): void {
        PWMPriod = period;
    }

    /**
     * PWM fast decay
     * @param speed [-1023..1023] speed of Motor
     */
    //% blockId=KS4033_PWMFast block="PWM fast decay Motor %m|speed %speed"
    //% weight=100
    //% speed.min=-1023 speed.max=1023
    export function PWMFast(m: Motor, speed: number): void {
        const amp = Math.abs(speed);
        const index = speed < 0 ? Dir.backward : speed == 0 ? 0 : Dir.forward;

        if (m == Motor.A) {
            if (index == Dir.forward) {
                pins.analogWritePin(PWMA1, amp);
                pins.analogSetPeriod(PWMA1, PWMPriod);
                pins.digitalWritePin(A2, 0);
            } else {
                pins.digitalWritePin(A1, 0);
                pins.analogWritePin(PWMA2, amp);
                pins.analogSetPeriod(PWMA2, PWMPriod);
            }
        } else {
            if (index == Dir.forward) {
                pins.analogWritePin(PWMB1, amp);
                pins.analogSetPeriod(PWMB1, PWMPriod);
                pins.digitalWritePin(B2, 0);
            } else {
                pins.digitalWritePin(B1, 0);
                pins.analogWritePin(PWMB2, amp);
                pins.analogSetPeriod(PWMB2, PWMPriod);
            }
        }
    }

    /**
     * PWM slow decay
     * @param speed [-1023..1023] speed of Motor
     */
    //% blockId=KS4033_PWMslow block="PWM slow decay Motor %m|speed %speed"
    //% weight=100
    //% speed.min=-1023 speed.max=1023
    export function PWMSlow(m: Motor, speed: number): void {
        const amp = Math.abs(speed);
        const index = speed < 0 ? Dir.backward : speed == 0 ? 0 : Dir.forward;

        if (m == Motor.A) {
            if (index == Dir.forward) {
                pins.digitalWritePin(A1, 1);
                pins.analogWritePin(PWMA2, 1023 - amp);
                pins.analogSetPeriod(PWMA2, PWMPriod);
            } else {
                pins.analogWritePin(PWMA1, 1023 - amp);
                pins.analogSetPeriod(PWMA1, PWMPriod);
                pins.digitalWritePin(A2, 1);
            }
        } else {
            if (index == Dir.forward) {
                pins.digitalWritePin(B1, 1);
                pins.analogWritePin(PWMB2, 1023 - amp);
                pins.analogSetPeriod(PWMB2, PWMPriod);
            } else {
                pins.analogWritePin(PWMB1, 1023 - amp);
                pins.analogSetPeriod(PWMB1, PWMPriod);
                pins.digitalWritePin(B2, 1);
            }
        }
    }

    /**
     * Drive
     * @param dir [-1..1] Direction of Motor
     */
    //% blockId=KS4033_Drive block="Drive Motor %m|dir %dir"
    //% weight=100
    //% d.min=-1 d.max=1
    export function Drive(m: Motor, dir: number): void {
        const index = dir < 0 ? Dir.backward : dir == 0 ? 0 : Dir.forward;

        if (m == Motor.A) {
            if (index == Dir.forward) {
                pins.digitalWritePin(A1, 1);
                pins.digitalWritePin(A2, 0);
            } else if (index == Dir.backward) {
                pins.digitalWritePin(A1, 0);
                pins.digitalWritePin(A2, 1);
            } else {
                pins.digitalWritePin(A1, 0);
                pins.digitalWritePin(A2, 0);
            }
        } else {
            if (index == Dir.forward) {
                pins.digitalWritePin(B1, 1);
                pins.digitalWritePin(B2, 0);
            } else if (index == Dir.backward) {
                pins.digitalWritePin(B1, 0);
                pins.digitalWritePin(B2, 1);
            } else {
                pins.digitalWritePin(B1, 0);
                pins.digitalWritePin(B2, 0);
            }
        }
    }

    //% blockId=MotorDriver_Coast
    //% block="Motor %Motor| Coast"
    //% weight=90
    export function Coast(m: Motor): void {
        if (m == Motor.A) {
            pins.digitalWritePin(A1, 0);
            pins.digitalWritePin(A2, 0);
        } else {
            pins.digitalWritePin(B1, 0);
            pins.digitalWritePin(B2, 0);
        }
    }

    //% blockId=MotorDriver_Brake
    //% block="Motor %Motor| Brake"
    //% weight=90
    export function Brake(m: Motor): void {
        if (m == Motor.A) {
            pins.digitalWritePin(A1, 1);
            pins.digitalWritePin(A2, 1);
        } else {
            pins.digitalWritePin(B1, 1);
            pins.digitalWritePin(B2, 1);
        }
    }
}
