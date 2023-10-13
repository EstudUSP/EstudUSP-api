import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Professor as ProfessorSchema } from '../schema/professor';

@injectable()
class ProfessorRepository {
  repository: Repository<ProfessorSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(ProfessorSchema);
  }

  get(name: string) {
    return this.repository.findOneBy({ name });
  }

  create(name: string) {
    const professor = new ProfessorSchema();
    professor.name = name;

    // TODO: not create if exists
    return this.repository.save(professor);
  }

  list() {
    return this.repository.find();
  }
}

export default ProfessorRepository;
