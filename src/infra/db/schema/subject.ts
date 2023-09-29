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

  @Column({ nullable: true })
  previewImg: string;

  @Column({ nullable: true })
  semester: number;

  @OneToMany(() => Question, (post) => post)
  posts: Question[];

  @OneToMany(() => Tag, (tag) => tag)
  tags: Tag[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation)
  recommendations: Recommendation[];
}
