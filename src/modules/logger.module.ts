import pino, { Logger } from 'pino';

import { AppConfig } from '../config';

const createLogger = (): Logger => {
  const logLevel = (): string => {
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
