import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractDateEntity } from '../../../common/entities/abstract-date.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { FileEntity } from '../../file/entities/file.entity';

@Entity({ name: 'post' })
export class PostEntity extends AbstractDateEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Идентификатор поста',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'title',
    comment: 'Заголовок',
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    name: 'text',
    comment: 'Основной текст поста',
    nullable: false,
  })
  text: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;

  @Column('int', { nullable: true, default: null })
  userId: number;

  @OneToOne(() => FileEntity)
  @JoinColumn({
    name: 'imageId',
  })
  image: FileEntity;

  @Column('int', { nullable: true, default: null })
  imageId: number;
}
