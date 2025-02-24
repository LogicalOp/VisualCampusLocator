const { exec } = require('child_process');
const logger = require('../../config/logger');
const path = require('path');

const computeSimilarity = (filePath, secureUrl) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join('C:/Users/dylan/Documents/Programming/VisualCampusLocator/scripts/vpr.py');
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
            try {
                const result = JSON.parse(stdout);
                resolve(result);
            } catch (parseError) {
                logger.error(`Error parsing JSON output: ${parseError.message}`);
                reject(parseError);
            }
        });
    });
};

module.exports = {
    computeSimilarity,
};