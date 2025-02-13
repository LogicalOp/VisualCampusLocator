const { exec } = require('child_process');
const logger = require('../../config/logger');
const path = require('path');

const computeSimilarity = () => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../../../scripts/example.py');
        exec(`python ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                logger.error(`Error executing script: ${error.message}`);
                return reject(error);
            }
            if (stderr) {
                logger.error(`Script error: ${stderr}`);
                return reject(new Error(stderr));
            }
            logger.verbose(`Script output: ${stdout}`);
            resolve(stdout);
        });
    });
};

module.exports = {
    computeSimilarity,
};