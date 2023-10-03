import 'reflect-metadata';

import { injectable } from 'inversify';
import { DataSource } from 'typeorm';

@injectable()
export default abstract class ISeed {
  abstract run(connection: DataSource): Promise<void>;
}
