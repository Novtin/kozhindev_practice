import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dbRepository: Repository<UserEntity>,
  ) {}

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

  async findAll(where: any, take: number, skip: number): Promise<UserEntity[]> {
    const [users] = await this.dbRepository.findAndCount({
      where,
      take,
      skip,
    });
    return users;
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.dbRepository.update(updateUserDto.id, updateUserDto);
    return await this.findById(updateUserDto.id);
  }

  async deleteById(id: number): Promise<void> {
    await this.dbRepository.softDelete({ id });
  }
}
