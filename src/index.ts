import 'reflect-metadata';
import 'dotenv/config';

import { BuildContainer } from './container';
import RestServer from './server/rest';

async function setup() {
  const container = await BuildContainer.getInstance();

  const restServer = container.get(RestServer);
  await restServer.serverFactory();
}

setup();
