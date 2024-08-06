import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from '../../file/entities/file.entity';
import { PostLikeEntity } from '../../post/entities/post-like.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Идентификатор пользователя',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'firstName',
    comment: 'Имя',
    nullable: false,
  })
  firstName: string;

  @Column('varchar', {
    name: 'surname',
    comment: 'Фамилия',
    nullable: false,
  })
  surname: string;

  @Column('varchar', {
    name: 'email',
    comment: 'Электронная почта',
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    name: 'passwordHash',
    comment: 'Электронная почта',
    nullable: false,
  })
  passwordHash: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Описание профиля',
    nullable: false,
  })
  description: string;

  @Column('varchar', {
    name: 'nickname',
    comment: 'Никнейм',
    nullable: false,
  })
  nickname: string;

  @OneToOne(() => FileEntity)
  @JoinColumn({
    name: 'avatarId',
  })
  avatar: FileEntity;

  @Column('int', { nullable: true, default: null })
  avatarId: number;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'user_subscription',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followerId',
      referencedColumnName: 'id',
    },
  })
  subscriptions: UserEntity[];

  @OneToMany(
    () => PostLikeEntity,
    (postLikeEntity: PostLikeEntity) => postLikeEntity.user,
  )
  likes: PostLikeEntity[];

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
