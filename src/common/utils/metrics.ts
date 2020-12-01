import { Middleware } from 'koa';
import * as client from 'prom-client';
import { AppConfig } from '../config';

interface MetricsOptions {
  appName: string;
  path: string;
  totalRequestsCounterName: string;
}

const defaultOptions: Omit<MetricsOptions, 'appName' | 'path'> = {
  totalRequestsCounterName: 'bot_requests_total',
};

class Metrics {
  private options: MetricsOptions;
  private registry: client.Registry;
  private koaMiddleware: Middleware;
  private totalRequestsCounter: client.Counter<'botName'>;

  constructor(options: typeof AppConfig.metrics) {
    this.options = {
      ...defaultOptions,
      path: options.path,
      appName: options.appName,
    };
    this.registry = new client.Registry();
    this.koaMiddleware = async (ctx, next) => {
      if (ctx.req.method === 'GET' && ctx.req.url === this.options.path) {
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
  }

  get middleware() {
    return this.koaMiddleware;
  }

  request() {
    this.totalRequestsCounter.inc({ botName: this.options.appName });
  }
}

const metrics = new Metrics(AppConfig.metrics);

export { metrics };
