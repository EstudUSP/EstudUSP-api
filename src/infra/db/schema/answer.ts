import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  upvote: number;

  @Column()
  anonymous: boolean;
}
