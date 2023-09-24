import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';
import { Recommendation } from './recommendation';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  picture_link?: string;

  @OneToMany(() => Question, (post) => post)
  posts: Question[];

  @OneToMany(() => Recommendation, (recommendation) => recommendation)
  recommendations: Recommendation[];
}
