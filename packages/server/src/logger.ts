import winston from 'winston'
import path from 'path'
import config from './configs'

let logger: winston.Logger

export default function getLogger() {
    if (!logger) {
        logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.File({
                  filename: path.join(config.LOGS_STORE_LOCATION || '', 'error.log'),
                  level: 'error' }),
              new winston.transports.File({
                  filename: path.join(config.LOGS_STORE_LOCATION || '', 'combined.log') }),
            ],
          })
    }

    return logger
}