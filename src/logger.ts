/* eslint-disable no-console */
const info = (data: unknown) => console.log(data);
const error = (data: unknown) => console.error(data);
/* eslint-enable no-console */

export const logger = {
  error,
  info,
};
