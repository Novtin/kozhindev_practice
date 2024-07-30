import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'post_like' })
export class PostLikeEntity {
  @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.likes)
  @JoinColumn({
    name: 'userId',
  })
  user: UserEntity;

  @Column('int', {
    name: 'userId',
    comment: 'ID пользователя',
    nullable: false,
    primary: true,
  })
  userId: number;

  @ManyToOne(() => PostEntity, (postEntity: PostEntity) => postEntity.likes)
  @JoinColumn({
    name: 'postId',
  })
  post: PostEntity;

  @Column('int', {
    name: 'postId',
    comment: 'ID поста',
    nullable: false,
    primary: true,
  })
  postId: number;
}
