import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user';
import { Subject } from './subject';
import { Professor } from './professor';
import { Tag } from './tag';

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  upvote: number;

  @Column()
  anonymous: boolean;

  @ManyToOne(() => Subject, (subject) => subject)
  subject: Subject;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Professor, (professor) => professor)
  professor: Professor;

  @ManyToMany(() => Tag, (tag) => tag)
  tags: Tag[];

  @Column('text', { nullable: true, array: true })
  attachments: string[];
}
