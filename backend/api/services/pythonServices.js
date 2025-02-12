const { exec } = require('child_process');
const path = require('path');

const computeSimilarity = () => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../../../scripts/example.py');
        exec(`python ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                console.error(`Script error: ${stderr}`);
                return reject(new Error(stderr));
            }
            console.log(`Script output: ${stdout}`);
            resolve(stdout);
        });
    });
};

module.exports = {
    computeSimilarity,
};