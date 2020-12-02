import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';

import { metrics } from '../../../common/utils';
import { auth } from './auth';

export const middlewares = [
  koaBody(),
  helmet(),
  auth,
  metrics.middleware,
];
