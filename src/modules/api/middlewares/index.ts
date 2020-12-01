import * as koaBody from 'koa-body';
import * as helmet from 'koa-helmet';

export const middlewares = [
  koaBody(),
  helmet(),
];
