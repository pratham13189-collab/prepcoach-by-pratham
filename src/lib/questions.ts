import { Question } from "./types";

// Question bank: add more questions here
export const questionBank: Record<string, Question[]> = {
  "Analog Electronics": [
    {
      "question": "What is the difference between a BJT and a MOSFET?",
      "reference": "BJT is current controlled, MOSFET is voltage controlled; MOSFET has high input impedance; MOSFET preferred for switching and low power; BJT has better gain linearity."
    },
    {
      "question": "Explain the working of an op-amp as an inverting amplifier.",
      "reference": "Input applied to inverting terminal through Rin, feedback Rf, non-inverting grounded; virtual ground; gain = -Rf/Rin; output is 180 degrees out of phase."
    },
    {
      "question": "What is the purpose of a Zener diode and how is it used as a voltage regulator?",
      "reference": "Operates in reverse breakdown; keeps voltage constant across load; used with series resistor; limited by power rating and load current."
    },
    {
      "question": "What is CMRR in an op-amp?",
      "reference": "Common Mode Rejection Ratio; ratio of differential gain to common mode gain; measured in dB; higher is better; rejects noise common to both inputs."
    }
  ],
  "Digital Electronics": [
    {
      "question": "What is the difference between combinational and sequential circuits?",
      "reference": "Combinational output depends only on current inputs; sequential depends on current inputs and past state; sequential uses flip-flops and a clock; examples: adder vs counter."
    },
    {
      "question": "Explain the difference between a latch and a flip-flop.",
      "reference": "Latch is level sensitive; flip-flop is edge triggered; flip-flop built from two latches (master-slave); flip-flops used in synchronous design."
    },
    {
      "question": "What are setup time and hold time?",
      "reference": "Setup: data must be stable before clock edge; hold: data must remain stable after edge; violations cause metastability."
    },
    {
      "question": "What is a multiplexer and where is it used?",
      "reference": "Selects one of many inputs using select lines; 2^n inputs need n select lines; used in data routing, implementing logic functions, communication."
    }
  ],
  "Microcontrollers & Embedded": [
    {
      "question": "What is the difference between a microprocessor and a microcontroller?",
      "reference": "Microcontroller has CPU, RAM, ROM and peripherals on one chip; microprocessor needs external memory and I/O; microcontroller is cheaper, low power, for dedicated tasks."
    },
    {
      "question": "What is an interrupt and why is it used?",
      "reference": "Signal that pauses the main program to run an ISR; avoids polling; saves CPU time; ISR should be short; interrupt priority and vector table."
    },
    {
      "question": "Compare UART, SPI and I2C.",
      "reference": "UART: asynchronous, 2 wires, no clock; SPI: synchronous, 4 wires, fast, full duplex; I2C: 2 wires SDA/SCL, addressing, multiple devices, slower."
    },
    {
      "question": "What is a watchdog timer?",
      "reference": "Timer that resets the MCU if software hangs; program must reset (kick) it periodically; improves reliability in embedded systems."
    }
  ],
  "Communication Systems": [
    {
      "question": "What is the need for modulation?",
      "reference": "Reduces antenna size; allows multiplexing of channels; reduces noise and interference; enables long distance transmission."
    },
    {
      "question": "Differentiate between AM and FM.",
      "reference": "AM varies amplitude, FM varies frequency; FM has better noise immunity; FM needs more bandwidth; AM simpler and cheaper."
    },
    {
      "question": "What is the Nyquist sampling theorem?",
      "reference": "Sampling frequency must be at least twice the highest signal frequency; otherwise aliasing occurs; anti-aliasing filter used."
    },
    {
      "question": "What is SNR and why is it important?",
      "reference": "Signal to noise ratio, signal power over noise power, usually in dB; higher SNR means better quality; limits channel capacity (Shannon)."
    }
  ],
  "Power Electronics": [
    {
      "question": "What is the difference between a linear regulator and a switching regulator?",
      "reference": "Linear drops excess voltage as heat, low efficiency, low noise, simple; switching uses inductor and switch, high efficiency, more noise, can step up or down."
    },
    {
      "question": "Explain the working of a buck converter.",
      "reference": "Steps down DC voltage; MOSFET switch, diode, inductor, capacitor; Vout = D x Vin; duty cycle controls output; PWM control."
    },
    {
      "question": "What is the function of a rectifier? Compare half wave and full wave.",
      "reference": "Converts AC to DC; full wave has higher average output, less ripple, better transformer utilisation; bridge rectifier uses 4 diodes."
    },
    {
      "question": "What is a heat sink and why is it needed?",
      "reference": "Dissipates heat from power devices; prevents thermal damage; thermal resistance; junction temperature limits."
    }
  ],
  "Basic Circuits & Measurements": [
    {
      "question": "State Kirchhoff's laws.",
      "reference": "KCL: sum of currents at a node is zero; KVL: sum of voltages around a loop is zero; based on conservation of charge and energy."
    },
    {
      "question": "What is Thevenin's theorem?",
      "reference": "Any linear network can be replaced by a voltage source Vth in series with Rth; find Vth as open circuit voltage, Rth by turning off sources; used for load analysis."
    },
    {
      "question": "What is the difference between an analog and a digital oscilloscope?",
      "reference": "Analog displays signal directly using CRT; digital samples and stores signal, allows storage, measurement and triggering; sampling rate limits bandwidth."
    },
    {
      "question": "Why do we use a pull-up resistor?",
      "reference": "Keeps a digital input at a defined high level when switch is open; prevents floating input; typical value 4.7k to 10k."
    }
  ]
};

export const topics = Object.keys(questionBank);
