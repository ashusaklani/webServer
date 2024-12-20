# import sys
# import json
# sys.stdout.write('sucessfull')
# def handle_message(data):
#     try:
#         parsed_data = json.loads(data)
#         value1 = parsed_data.get('val')
#         print(f'value 1 : {value1}')
#         return value1
#     except json.JSONDecodeError as e:
#         sys.stderr.write(f'Error this is ww     : {e}\n')
#     except Exception as e:
#         sys.stderr.write(f'Unexpected error: {e}\n')

# while True:
#     line = sys.stdin.readline().strip()
#     if line:
#         value =handle_message(line)
#     sys.stdout.write({value: value})
import RPi.GPIO as GPIO
import sys
import json
from time import sleep
count=1
print('response recieve',flush=True)
def handle_message(message):
    try:
        data = json.loads(message)
        val = data.get('val')
        return int(val)
        
    except json.JSONDecodeError as e:
        sys.stderr.write(f'Error: {e}\n')
    except Exception as e:
        sys.stderr.write(f'Unexpected error: {e}\n')


# Simulate sending a message back to Node.js
# sys.stdout.write(json.dumps({"response": "Acknowledged"}))
# sys.stdout.flush()
GPIO.setmode(GPIO.BOARD)

led_pin=40
brightness=50
GPIO.setup(led_pin,GPIO.OUT)
myPWM=GPIO.PWM(led_pin,100)
myPWM.start(brightness)
def cleanup_gpio(signal, frame):
    print("Cleaning up GPIO", flush=True)
    GPIO.cleanup()
    sys.exit(0)
import signal 
signal.signal(signal.SIGINT, cleanup_gpio) 
signal.signal(signal.SIGTERM, cleanup_gpio)
try:

    while True:
        value=input('enter data :')
        brightness=handle_message(value);
        myPWM.ChangeDutyCycle(brightness)
        count+=1
        # line = sys.stdin.readline()
        # sys.stdout.write("inside the line")
        # sys.stdout.flush()
        # if(line):
            
        #     brightness=handle_message(line.strip())
        #     sys.stdout.write(json.dumps({"brightness : yes "}))
        #     sys.stdout.flush()
        #     if(brightness>100):
        #         brightness=99
        #     if(brightness<0):
        #         brightness=0
        #     myPWM.ChangeDutyCycle(brightness)
        #     sleep(2)
        
        
except KeyboardInterrupt:
    GPIO.cleanup()
    myPWM.stop()
    print('Terminating the program')