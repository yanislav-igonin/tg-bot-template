import { AppConfig } from './config';
import { LoggerModule, BotModule } from './modules';

const launch = async () => {
  LoggerModule.info('release -', AppConfig.release);
  await BotModule.launch();
};

launch()
  .then(() => LoggerModule.info('all systems nominal'))
  .catch((err: Error) => {
    LoggerModule.error('bot - offline');
    LoggerModule.error(err);
  });
