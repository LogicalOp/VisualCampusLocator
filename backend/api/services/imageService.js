const { exec } = require('child_process');
const path = require('path');

const runPythonScript = () => {
    const scriptPath = path.join(__dirname, '../../scripts/test.py');
    exec(`python ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return;
        }
        console.log(`Script output: ${stdout}`);
    });
};

module.exports = {
    runPythonScript,
};