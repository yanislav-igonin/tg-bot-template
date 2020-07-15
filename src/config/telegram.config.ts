const TelegramConfig = {
  token: process.env.BOT_TOKEN || '',
  webhook: {
    host: process.env.WEBHOOK_HOST || '',
    port: process.env.WEBHOOK_PORT
      ? parseInt(process.env.WEBHOOK_PORT, 10)
      : 8000,
    path: process.env.WEBHOOK_PATH || '',
    isEnabled: process.env.IS_WEBHOOK_ENABLED === 'true',
  },
};

export { TelegramConfig };
