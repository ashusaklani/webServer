import {spawn} from "child_process";
let pythonProcess = null;

const startUltrasonicProcess = () => {
    if (!pythonProcess) {
        pythonProcess = spawn('python3', ['/home/yash/Documents/server/webserver/webServer/src/pythonPrograms/ultrasonicScript.py'], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
        pythonProcess.stdout.on('data', (data) => {
            if(data==null){
                
            }
            else{
                let sensorData=data.toString();
                return sensorData;
                console.log(`Stdout: ${data}`);
            }
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`Process exited with code ${code}`);
            pythonProcess = null;
        });

        console.log('Python process started');
    } else {
        console.log('Python process is already running');
    }
};

const stopUltrasonicProcess = () => {
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
        console.log('Python process stopped');
    } else {
        console.log('No Python process to stop');
    }
};




export {startUltrasonicProcess,stopUltrasonicProcess}