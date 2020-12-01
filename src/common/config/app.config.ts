const AppConfig = {
  env: process.env.NODE_ENV || 'development',
  release: process.env.CI_COMMIT_TAG || 'development',
  metrics: {
    appName: process.env.APP_NAME || 'typescript-telegram-bot-template',
    path: process.env.METRICS_PATH || '/metrics',
  },
};

export { AppConfig };
