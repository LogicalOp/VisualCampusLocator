const winston = require('winston');
const path = require('path');
const fs = require('fs');
const { formatDate } = require('../utils/date');

// Create the logs directory if it does not exist
const logsDir = path.join(__dirname, '../logs');
if(!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
};

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        sql: 4,
        verbose: 5,
        debug: 6,
        silly: 7
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        sql: 'magenta',
        verbose: 'cyan',
        debug: 'white',
        silly: 'grey'
    }
};

winston.addColors(logLevels.colors);

// Console Format
const consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
        const formattedTimestamp = formatDate(timestamp);
        return `[${formattedTimestamp}] ${level}: ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}`;
    })
);

// File Format
const fileFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({ level, message, timestamp }) => {
        const formattedTimestamp = formatDate(timestamp);
        return `[${formattedTimestamp}] ${level}: ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}`;
    })
);

const logger = winston.createLogger({
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console({
            format: consoleFormat,
            level: 'silly'
        }),
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',
            format: fileFormat
        }),
        new winston.transports.File({
            filename: path.join(logsDir, 'all.log'),
            format: fileFormat,
            maxsize: 5 * 1024 * 1024,
            maxFiles: 5
        })
    ]
});

module.exports = logger;