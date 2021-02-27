import { Middleware } from 'koa';
import * as client from 'prom-client';
import { appConfig } from '../config';

interface MetricsOptions {
  appName: string;
  path: string;
  totalRequestsCounterName: string;
  totalErrorsCounterName: string;
}

const defaultOptions: Omit<MetricsOptions, 'appName' | 'path'> = {
  totalRequestsCounterName: 'bot_requests_total',
  totalErrorsCounterName: 'bot_errors_total',
};

class Metrics {
  private options: MetricsOptions;
  private registry: client.Registry;
  private koaMiddleware: Middleware;
  private totalRequestsCounter: client.Counter<'botName'>;
  private totalErrorsCounter: client.Counter<'botName'>;

  constructor(options: typeof appConfig.metrics) {
    this.options = {
      ...defaultOptions,
      path: options.path,
      appName: options.appName,
    };
    this.registry = new client.Registry();
    this.koaMiddleware = async (ctx, next) => {
      const url = `/api${this.options.path}`;
      if (ctx.method === 'GET' && ctx.url === url) {
        ctx.body = this.registry.metrics();
      } else {
        await next();
      }
    };

    this.totalRequestsCounter = new client.Counter({
      name: this.options.totalRequestsCounterName,
      help: 'Total bot requests',
      labelNames: ['botName'],
    });
    this.registry.registerMetric(this.totalRequestsCounter);

    this.totalErrorsCounter = new client.Counter({
      name: this.options.totalErrorsCounterName,
      help: 'Total bot errors',
      labelNames: ['botName'],
    });
    this.registry.registerMetric(this.totalErrorsCounter);
  }

  get middleware() {
    return this.koaMiddleware;
  }

  request() {
    this.totalRequestsCounter.inc({ botName: this.options.appName });
  }

  error() {
    this.totalErrorsCounter.inc({ botName: this.options.appName });
  }
}

const metrics = new Metrics(appConfig.metrics);

export { metrics };
