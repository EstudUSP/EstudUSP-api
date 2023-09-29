import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Question } from './question';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  likes: number;

  @Column()
  dislikes: number;

  @Column()
  anonymous: boolean;

  @Column('text', { nullable: true, array: true })
  attachments: string[];

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Question, (question) => question)
  question: Question;
}
