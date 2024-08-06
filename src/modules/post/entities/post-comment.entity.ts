import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'post_comment' })
export class PostCommentEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Идентификатор комментария',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'text',
    comment: 'Текст комментария',
    nullable: false,
  })
  text: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;

  @Column('int', { nullable: false })
  userId: number;

  @ManyToOne(() => PostEntity)
  @JoinColumn({
    name: 'postId',
  })
  post: PostEntity;

  @Column('int', { nullable: false })
  postId: number;

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
}
