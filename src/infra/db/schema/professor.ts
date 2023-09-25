import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';
import { Recommendation } from './recommendation';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Question, (post) => post)
  posts: Question[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation)
  recommendations: Recommendation[];
}
