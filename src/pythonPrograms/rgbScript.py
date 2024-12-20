import RPi.GPIO as GPIO
import time
import sys
import json
# Set the GPIO mode
print("rgb program started",flush=True)
GPIO.setmode(GPIO.BOARD)

# Define the GPIO pins for the RGB LED
RED_PIN = 16
GREEN_PIN = 18
BLUE_PIN = 22
# Set up the GPIO pins as outputs
GPIO.setup(RED_PIN, GPIO.OUT)
GPIO.setup(GREEN_PIN, GPIO.OUT)
GPIO.setup(BLUE_PIN, GPIO.OUT)

# Create PWM instances for each color
red_pwm = GPIO.PWM(RED_PIN, 1000)  # 1kHz frequency
green_pwm = GPIO.PWM(GREEN_PIN, 990)
blue_pwm = GPIO.PWM(BLUE_PIN, 1101)

# Start PWM with 0% duty cycle (off)
red_pwm.start(0)
green_pwm.start(0)
blue_pwm.start(0)

def cleanup_gpio(signal, frame):
    print("Cleaning up GPIO", flush=True)
    red_pwm.ChangeDutyCycle(0) 
    green_pwm.ChangeDutyCycle(0) 
    blue_pwm.ChangeDutyCycle(0)
    red_pwm.stop()
    green_pwm.stop()
    blue_pwm.stop()
    GPIO.cleanup()
    sys.exit(0)
import signal 
signal.signal(signal.SIGINT, cleanup_gpio) 
signal.signal(signal.SIGTERM, cleanup_gpio)

def handleData(data):
    try:
        data = json.loads(data)
        rVal =int ( data.get('rVal'))
        gVal=int(data.get('gVal'))
        bVal=int(data.get('bVal'))
        red_pwm.ChangeDutyCycle(rVal)
        blue_pwm.ChangeDutyCycle(bVal)
        green_pwm.ChangeDutyCycle(gVal)
        print("ok rgb value set",flush=True)
    except json.JSONDecodeError as e:
        sys.stderr.write(f'Error: {e}\n')
    except Exception as e:
        sys.stderr.write(f'Unexpected error: {e}\n')

try:
    while True:
        rgbData=input("Enter RGB val :")
        handleData(rgbData)
except KeyboardInterrupt:
    pass

# finally:
#     # Clean up the GPIO pins and stop PWM
    red_pwm.ChangeDutyCycle(0) 
    green_pwm.ChangeDutyCycle(0) 
    blue_pwm.ChangeDutyCycle(0)
    red_pwm.stop()
    green_pwm.stop()
    blue_pwm.stop()
    GPIO.cleanup()
