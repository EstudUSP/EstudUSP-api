import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';
import { Question } from './question';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column('text', { nullable: true, array: true })
  attachments: string[];

  @Column({ nullable: true })
  username: string;

  @CreateDateColumn()
  publishedAt: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Question, (question) => question)
  question: Question;
}
