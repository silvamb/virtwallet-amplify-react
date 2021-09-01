const winston = require('winston');

const createLogger = (level = 'info') => {
  return winston.createLogger({
    level,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
  });
}

const defaultLogger = createLogger(process.env.LOG_LEVEL);

exports.createLogger = createLogger;
exports.logger = defaultLogger;