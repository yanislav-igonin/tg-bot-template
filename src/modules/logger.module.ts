import * as pino from 'pino';

import { AppConfig } from '../config';

const createLogger = () => {
  const logLevel = () => {
    if (AppConfig.env === 'development') return 'debug';

    return 'info';
  };

  return pino({
    level: logLevel(),
    prettyPrint: true,
  });
};

const LoggerModule = createLogger();

export { LoggerModule };
