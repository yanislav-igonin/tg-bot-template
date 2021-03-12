export interface AppConfig {
  env: string;
  release: string;
  metrics: {
    appName: string;
    path: string;
  };
  apiToken: string;
}

export interface TelegramConfig {
  token: string;
  webhook: {
    host: string;
    port: number;
    path: string;
  };
}

export interface Config {
  appConfig: AppConfig;
  telegramConfig: TelegramConfig;
}
