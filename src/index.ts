import { AppConfig } from './config';
import { LoggerModule, BotModule } from './modules';

const launch = async (): Promise<void> => {
  LoggerModule.info('release -', AppConfig.release);
  await BotModule.launch();
};

launch()
  .then((): void => LoggerModule.info('all systems nominal'))
  .catch((err: Error): void => {
    LoggerModule.error('bot - offline');
    LoggerModule.error(err);
  });
