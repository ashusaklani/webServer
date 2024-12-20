import {spawn} from "child_process";
let pythonProcess = null;

const startRGBProcess = () => {
    if (!pythonProcess) {
        pythonProcess = spawn('python3', ['/home/yash/Documents/server/webserver/webServer/src/pythonPrograms/rgbScript.py'], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
        pythonProcess.stdout.on('data', (data) => {
            console.log(`Stdout: ${data}`);
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

const sendRGBData = async (data) => {
    if (pythonProcess) {
        // console.log(`sending the messsage ${message}`);
        // const responsePy = await pythonProcess.send(message);
        // console.log(responsePy)
        // console.log(`send the message`);
        console.log(data);
        pythonProcess.stdin.write(data+ '\n');
    } else {
        console.log('Python process is not running');
    }
};

const stopRGBProcess = () => {
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
        console.log('Python process stopped');
    } else {
        console.log('No Python process to stop');
    }
};

export {
    startRGBProcess,
    sendRGBData,
    stopRGBProcess
};
