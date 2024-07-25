import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindOperator,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dbRepository: Repository<UserEntity>,
  ) {}

  private readonly TWO_WORDS_IN_QUERY: number = 2;
  private readonly ONE_WORD_IN_QUERY: number = 1;

  async create<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<UserEntity> {
    return this.dbRepository.save(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.dbRepository.findOneBy({ email });
  }

  async findByNickname(nickname: string): Promise<UserEntity> {
    return this.dbRepository.findOneBy({ nickname });
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.dbRepository.existsBy({ email });
  }

  async existById(id: number): Promise<boolean> {
    return this.dbRepository.existsBy({ id });
  }

  async existByNickname(nickname: string): Promise<boolean> {
    return this.dbRepository.existsBy({ nickname });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.dbRepository.findOneBy({ id });
  }

  async findByIdWithRelations(id: number): Promise<UserEntity> {
    return this.dbRepository.findOne({
      where: { id: id },
      relations: ['avatar'],
    });
  }

  async findByCriteria(
    query: string,
    take: number,
    skip: number,
  ): Promise<UserEntity[]> {
    const querySplit: string[] = query?.trim()?.split(' ');
    let where: FindOptionsWhere<UserEntity>;
    switch (querySplit?.length) {
      case this.ONE_WORD_IN_QUERY: {
        const searchValue: FindOperator<string> = ILike(`%${querySplit[0]}%`);
        where = [
          { firstName: searchValue },
          { surname: searchValue },
          { nickname: searchValue },
        ] as FindOptionsWhere<UserEntity>;
        break;
      }
      case this.TWO_WORDS_IN_QUERY: {
        const firstSearchValue: FindOperator<string> = ILike(
          `%${querySplit[0]}%`,
        );
        const secondSearchValue: FindOperator<string> = ILike(
          `%${querySplit[1]}%`,
        );
        where = [
          { firstName: firstSearchValue, surname: secondSearchValue },
          { surname: firstSearchValue, firstName: secondSearchValue },
        ] as FindOptionsWhere<UserEntity>;
        break;
      }
    }
    const [users] = await this.dbRepository.findAndCount({
      where,
      take,
      skip,
      relations: ['avatar'],
    });
    return users;
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const {
      id,
      nickname,
      firstName,
      surname,
      description,
      passwordHash,
      email,
    } = updateUserDto;
    await this.dbRepository.update(id, {
      nickname,
      firstName,
      surname,
      description,
      passwordHash,
      email,
    });
    return await this.findByIdWithRelations(updateUserDto.id);
  }

  async updateAvatar(userEntity: UserEntity): Promise<UserEntity> {
    await this.dbRepository.update(userEntity.id, {
      avatar: userEntity.avatar,
    });
    return await this.findByIdWithRelations(userEntity.id);
  }

  async deleteById(id: number): Promise<void> {
    await this.dbRepository.softDelete({ id });
  }
}
