const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}] : ${message}`;
});

const logger = createLogger({
    level: 'error',
    format: combine(timestamp(), logFormat),
    transports: [
        new transports.File({ filename: 'logs/error.log' })
    ]
});

module.exports = logger;
