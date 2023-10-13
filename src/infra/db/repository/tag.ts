import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Tag as TagSchema } from '../schema/tag';
import { Subject as SubjectSchema } from '../schema/subject';

@injectable()
class TagRepository {
  repository: Repository<TagSchema>;

  subjectRepository: Repository<SubjectSchema>;

  constructor(
    @inject(DataSource) private readonly db: DataSource,
  ) {
    this.repository = this.db.getRepository(TagSchema);
    this.subjectRepository = this.db.getRepository(SubjectSchema);
  }

  async create(titles: string[], subject: any) {
    const tagsEntities = await Promise.all(titles.map(async (title) => {
      const tag = new TagSchema();
      tag.title = title;
      tag.subject = this.subjectRepository.create(subject)[0];

      const existentTag = await this.repository.findOneBy({
        title,
        subject: { id: subject.id },
      });

      if (existentTag) return existentTag;

      return await this.repository.save(tag);
    }));

    return tagsEntities;
  }
}

export default TagRepository;
