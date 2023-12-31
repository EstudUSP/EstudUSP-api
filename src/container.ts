import { Container } from 'inversify';
import path from 'path';
import { glob } from 'glob';
import { DataSource } from 'typeorm';

import RestServer from './infra/server/rest';

import AppDataSource from './infra/db';
import logger from './infra/logger';
import CreateSubjectsSeed from './infra/db/seed/subjects';

const console = logger.child({ label: 'Container' });

enum Scope {
  TRANSIENT,
  SINGLETON,
  REQUEST
}

enum Type {
  CLASS,
  CONSTANT,
  FACTORY
}

export class BuildContainer {
  static instance: Container;

  static async getInstance() {
    if (this.instance) return this.instance;

    this.instance = await new BuildContainer().factory();
    return this.instance;
  }

  async factory(): Promise<Container> {
    const container = new Container();

    await this.load(container, path.resolve(__dirname, './infra/db/seed'), Scope.SINGLETON);
    await this.loadList(container, path.resolve(__dirname, './infra/db/seed'), 'seeds');

    try {
      const datasource = await AppDataSource.initialize();
      container.bind(DataSource).toConstantValue(datasource).whenTargetIsDefault();

      if (process.env.NODE_ENV !== 'test') {
        console.info('Data source initialized. Running seeds...');

        const subjectSeed = new CreateSubjectsSeed();
        subjectSeed.run(datasource);

        // const seed: ISeed[] = container.getAllNamed(ISeed, 'seeds');
        // seed.run();
      }
    } catch(err) {
      console.error('Error during Data Source initialization', err);
    }

    await this.load(container, path.resolve(__dirname, './application/useCase'), Scope.SINGLETON);
    await this.load(container, path.resolve(__dirname, './domain/entity'), Scope.SINGLETON);
    await this.load(container, path.resolve(__dirname, './domain/service'), Scope.SINGLETON);
    await this.load(container, path.resolve(__dirname, './infra/db/repository'), Scope.SINGLETON);

    if (process.env.NODE_ENV === 'test') return container;

    await this.load(container, path.resolve(__dirname, './infra/server/rest/controller'), Scope.SINGLETON);
    await this.load(container, path.resolve(__dirname, './infra/server/rest/router'), Scope.SINGLETON);
    await this.loadList(container, path.resolve(__dirname, './infra/server/rest/router'), 'routers');

    container.bind(RestServer).to(RestServer).inSingletonScope();

    return container;
  }

  async loadList(container: Container, dir: string, identifier: string): Promise<void> {
    const files = await glob(dir + '/**/*.@(ts|js)');
    const list: any[] = [];

    for (const filename of files) {
      const file = path.parse(filename);

      if (file.name === 'index') continue;
      let Class = require(path.join(file.dir, file.name));

      if (typeof Class === 'object' && Class.default) Class = Class.default;
      if (typeof Class !== 'function') continue;

      const item = container.get(Class);

      list.push(item);
    }

    container.bind(identifier).toConstantValue(list);
  }

  async load(
    container: Container,
    dir: string,
    scope: Scope,
    type: Type = Type.CLASS,
    resolution = 'default',
    ignoreIndex = true,
    named = false,
  ) {
    if (type === Type.CONSTANT) named = true;

    const files = await glob(dir + '/**/*.@(ts|js)');

    for (const filename of files) {
      if (filename.includes('__test__')) continue;
      const file = path.parse(filename);

      if (file.name === 'index' && ignoreIndex) continue;

      const module = require(path.join(file.dir, file.name));

      let Class = module;
      const target = module[resolution] || Class.default?.[resolution];

      if (typeof Class === 'object' && Class.default) Class = Class.default;
      if (typeof target !== 'function') continue;

      let binding;

      switch (type) {
        case Type.CLASS:
          switch (scope) {
            case Scope.TRANSIENT: binding = container.bind(Class).to(target).inTransientScope(); break;
            case Scope.SINGLETON: binding = container.bind(Class).to(target).inSingletonScope(); break;
            case Scope.REQUEST: binding = container.bind(Class).to(target).inRequestScope(); break;
          }
          break;
        case Type.FACTORY:
          switch (scope) {
            case Scope.REQUEST:
            case Scope.TRANSIENT: binding = container.bind(Class).toFactory(target); break;
            case Scope.SINGLETON: binding = container.bind(Class).toDynamicValue(target).inSingletonScope(); break;
          }
          break;
        case Type.CONSTANT:
          const dir = path.parse(file.dir).name;
          binding = container.bind(dir).toConstantValue(target);
          break;
      }

      if (binding) {
        if (named) binding.whenTargetNamed(file.name);
        else binding.whenTargetIsDefault();
      }
    }
  }
}