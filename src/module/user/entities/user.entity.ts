import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updatedAt: Date;

  // Реализация OneToOne с сущностью "file"
  // пока не сделана, поэтому код в комментарии
  //
  // @Column('int', {
  //   name: 'photoId',
  //   comment: 'Идентификатор аватарки',
  //   nullable: true,
  // })
  // photoId: number;
}
