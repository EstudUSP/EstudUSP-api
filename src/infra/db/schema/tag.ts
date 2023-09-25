import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';
import { Recommendation } from './recommendation';
import { Subject } from './subject';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Question, (post) => post)
  posts: Question[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation)
  recommendations: Recommendation[];

  @ManyToOne(() => Subject, (subject) => subject)
  subject: Subject;
}
