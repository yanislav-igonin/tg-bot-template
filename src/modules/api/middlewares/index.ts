import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';

import { metrics } from '../../../common/utils';
import { auth } from './auth';
import { errorHandler } from './errorHandler';

export * from './botHandler';

export const middlewares = [
  koaBody(),
  helmet(),
  errorHandler,
  auth,
  metrics.middleware,
];
