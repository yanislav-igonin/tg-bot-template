import pino, { Logger as PinoLogger } from 'pino';

import { app } from '../config';

interface Loggers {
  development: PinoLogger;
  production: PinoLogger;

  [key: string]: PinoLogger;
}

const loggers: Loggers = {
  development: pino({ timestamp: false, level: 'debug', prettyPrint: true }),
  production: pino({ level: 'error', prettyPrint: true }),
};

const logger: PinoLogger = loggers[app.env];

export default logger;
