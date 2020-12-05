import * as config from './common/config';
import { LoggerModule, BotModule, ApiModule } from './modules';

const launch = async () => {
  LoggerModule.info('release -', config.appConfig.release);
  const bot = new BotModule(config);
  const api = new ApiModule(config, bot);
  await api.launch();
};

launch()
  .then(() => LoggerModule.info('all systems nominal'))
  .catch((err: Error) => {
    LoggerModule.error('app - offline');
    LoggerModule.error(err);
  });
