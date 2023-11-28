import 'dotenv/config.js';
import Koa from 'koa';
import { HttpMethodEnum, koaBody } from 'koa-body';
import errorMiddleware from './middleware/error/error.js';
import apiRouter from './router/api/router.js';
import monitoringRouter from './router/monitoring/router.js';

const { API_SERVER_PORT } = process.env;
const { MONITORING_SERVER_PORT } = process.env;

const app = new Koa();
const monitoring = new Koa();

const main = async () => {
  monitoring.use(
    koaBody({
      parsedMethods: [HttpMethodEnum.GET],
    }),
  );

  app.use(
    koaBody({
      parsedMethods: [
        HttpMethodEnum.GET,
        HttpMethodEnum.POST,
        HttpMethodEnum.PATCH,
      ],
    }),
  );

  app.use(errorMiddleware);

  app.use(apiRouter.middleware());
  monitoring.use(monitoringRouter.middleware());

  monitoring.listen(MONITORING_SERVER_PORT, () => {
    console.log(`Monitoring API is listening on port ${MONITORING_SERVER_PORT}`);
  });

  app.listen(API_SERVER_PORT, () => {
    console.log(`API is listening on port ${API_SERVER_PORT}`);
  });
};

export default main;
