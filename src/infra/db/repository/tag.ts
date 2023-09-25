import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

import { Tag as TagSchema } from '../schema/tag';
import { Subject as SubjectSchema } from '../schema/subject';

import Tag from '../../../domain/entity/tag';
import Subject from '../../../domain/entity/subject';

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

  async create(titles: string[], subject: Subject) {
    const tagsEntities = await Promise.all(titles.map(async (title) => {
      const tag = new TagSchema();
      tag.title = title;
      tag.subject = this.subjectRepository.create(subject);

      const alreadyExists = await this.repository.findOneBy({
        title,
        subject: { id: subject.id },
      });

      if (alreadyExists) {
        const tagEntity = new Tag(alreadyExists.id, alreadyExists.title);
        return tagEntity;
      }

      const newTag = await this.repository.save(tag);
      const tagEntity = new Tag(newTag.id, newTag.title);

      return tagEntity;
    }));

    return tagsEntities;
  }
}

export default TagRepository;
