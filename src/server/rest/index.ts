import express from 'express';
import expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';
import { inject, injectable } from 'inversify';
import winston from 'winston';
import fs from 'fs';

const dir = './uploads';

import IRouter from './router';

import logger, { winstonFormat } from '../../infra/logger';
const console = logger.child({ label: 'HTTPS Server' });

@injectable()
export default class RestServer {
  constructor(
    @inject('routers') private readonly routers: IRouter[],
  ) {}

  async serverFactory() {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
    app.use(helmet.dnsPrefetchControl({ allow: false }));
    app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    app.use(express.json());
    app.use('/files', express.static(process.env.MODE === 'production' ? '/mnt/uploads' : process.cwd() + '/uploads'));

    const port = Number(process.env.HTTP_SERVER_PORT);

    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console()
      ],
      format: winstonFormat,
      expressFormat: true,
      colorize: true,
    }));

    for (const router of this.routers) {
      const iRouter = await router.loadRouter();
      await app.use(iRouter);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    app.listen(port);

    console.info(`HTTPS server initialized on ${port}`);
  }
}
