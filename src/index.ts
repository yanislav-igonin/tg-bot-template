import * as Config from './config';
import { LoggerModule, BotModule, ApiModule } from './modules';

const launch = async () => {
  LoggerModule.info('release -', Config.AppConfig.release);
  const bot = new BotModule(Config);
  const api = new ApiModule(Config, bot);
  await api.launch();
};

launch()
  .then(() => LoggerModule.info('all systems nominal'))
  .catch((err: Error) => {
    LoggerModule.error('bot - offline');
    LoggerModule.error(err);
  });
