import * as pino from 'pino';

import { appConfig } from '../common/config';

const createLogger = () => {
  const logLevel = () => {
    if (appConfig.env === 'development') return 'debug';

    return 'info';
  };

  return pino({
    level: logLevel(),
    prettyPrint: true,
  });
};

const LoggerModule = createLogger();

export { LoggerModule };
