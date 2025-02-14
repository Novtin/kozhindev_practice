import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { FileEntity } from '../../file/entities/file.entity';
import { PostLikeEntity } from './post-like.entity';
import { TagEntity } from '../../tag/entities/tag.entity';
import { PostCommentEntity } from './post-comment.entity';

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

  @OneToMany(
    () => PostCommentEntity,
    (postCommentEntity: PostCommentEntity) => postCommentEntity.post,
  )
  comments: PostCommentEntity[];

  @ManyToMany(() => TagEntity, (tagEntity: TagEntity) => tagEntity.posts)
  @JoinTable({
    name: 'post_with_tag',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[];
}
