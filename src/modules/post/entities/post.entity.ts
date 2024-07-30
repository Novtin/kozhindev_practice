import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { FileEntity } from '../../file/entities/file.entity';
import { PostLikeEntity } from './post-like.entity';

@Entity({ name: 'post' })
export class PostEntity {
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

  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
  })
  deletedAt: Date;

  @OneToMany(
    () => PostLikeEntity,
    (postLikeEntity: PostLikeEntity) => postLikeEntity.post,
  )
  likes: PostLikeEntity[];
}
