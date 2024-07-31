import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';

@Entity({ name: 'post_tag' })
export class TagEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Идентификатор тега',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    comment: 'Название тега',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => PostEntity, (postEntity: PostEntity) => postEntity.tags)
  posts: PostEntity[];
}
