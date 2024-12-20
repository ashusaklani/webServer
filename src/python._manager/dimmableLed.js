import {spawn} from "child_process";
let pythonProcess = null;

const startProcess = () => {
    if (!pythonProcess) {
        pythonProcess = spawn('python3', ['/home/yash/Documents/server/webserver/webServer/src/pythonPrograms/ledScript.py'], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
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

const sendMessageToProcess = async (message) => {
    if (pythonProcess) {
        // console.log(`sending the messsage ${message}`);
        // const responsePy = await pythonProcess.send(message);
        // console.log(responsePy)
        // console.log(`send the message`);
        console.log(message);
        pythonProcess.stdin.write(message+ '\n');
    } else {
        console.log('Python process is not running');
    }
};

const stopProcess = () => {
    if (pythonProcess) {
        pythonProcess.kill();
        pythonProcess = null;
        console.log('Python process stopped');
    } else {
        console.log('No Python process to stop');
    }
};

export {
    startProcess,
    sendMessageToProcess,
    stopProcess
};
