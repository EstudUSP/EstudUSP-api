import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  type: string;
}
