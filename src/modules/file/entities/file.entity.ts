import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'file' })
export class FileEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Идентификатор файла',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    comment: 'Название',
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    name: 'mimeType',
    comment: 'MIME тип',
    nullable: false,
  })
  mimeType: string;

  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date;
}
