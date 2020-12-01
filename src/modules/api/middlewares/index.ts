import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';

import { metrics } from '../../../common/utils';

export const middlewares = [
  koaBody(),
  helmet(),
  metrics.middleware,
];
