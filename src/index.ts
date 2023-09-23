import 'reflect-metadata';
import 'dotenv/config';

import buildContainer from './container';
import RestServer from './server/rest';

async function setup() {
  const container = await buildContainer();

  const restServer = container.get(RestServer);
  await restServer.serverFactory();
}

setup();
