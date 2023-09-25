import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
