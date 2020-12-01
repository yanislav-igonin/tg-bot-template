import * as Config from './config';
import { LoggerModule, BotModule } from './modules';

const launch = async () => {
  LoggerModule.info('release -', Config.AppConfig.release);
  const bot = new BotModule(Config);
  await bot.launch();
};

launch()
  .then(() => LoggerModule.info('all systems nominal'))
  .catch((err: Error) => {
    LoggerModule.error('bot - offline');
    LoggerModule.error(err);
  });
