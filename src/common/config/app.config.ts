const AppConfig = {
  env: process.env.NODE_ENV || 'development',
  release: process.env.CI_COMMIT_TAG || 'development',
};

export { AppConfig };
