const telegramConfig = {
  token: process.env.BOT_TOKEN || '',
  webhook: {
    host: process.env.WEBHOOK_HOST || '',
    port: process.env.WEBHOOK_PORT
      ? parseInt(process.env.WEBHOOK_PORT, 10)
      : 3000,
    path: process.env.WEBHOOK_PATH || '',
  },
};

export { telegramConfig };
