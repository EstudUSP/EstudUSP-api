import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Question } from './question';
import { Tag } from './tag';
import { Recommendation } from './recommendation';

@Entity()
export class Subject {
  @PrimaryColumn()
  id: string; // USP code

  @Column()
  title: string;

  @Column()
  previewImg: string;

  @Column()
  semester: number;

  @OneToMany(() => Question, (question) => question)
  questions: Question[];

  @OneToMany(() => Tag, (tag) => tag)
  tags: Tag[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation)
  recommendations: Recommendation[];
}
