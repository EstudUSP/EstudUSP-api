import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Professor as ProfessorSchema } from '../schema/professor';
import Professor from '../../../domain/entity/professor';

@injectable()
class ProfessorRepository {
  repository: Repository<ProfessorSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(ProfessorSchema);
  }

  async create(name: string) {
    const professor = new ProfessorSchema();
    professor.name = name;

    // TODO: not create if exists
    const newProfessor = await this.repository.save(professor);

    const professorEntity = new Professor(newProfessor.id, name);

    return professorEntity;
  }
}

export default ProfessorRepository;
