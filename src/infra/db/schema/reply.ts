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

  @Column({ default: 0 })
  downvotes: number;

  @Column()
  anonymous: boolean;

  @Column('text', { nullable: true, array: true })
  attachments: string[];

  @CreateDateColumn()
  publishedAt: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Question, (question) => question)
  question: Question;
}
