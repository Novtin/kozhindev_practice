import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async findByNickname(nickname: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ nickname });
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsBy({ email });
  }

  async existById(id: number): Promise<boolean> {
    return this.userRepository.existsBy({ id });
  }

  async existByNickname(nickname: string): Promise<boolean> {
    return this.userRepository.existsBy({ nickname });
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(updateUserDto.id, updateUserDto);
    return await this.findById(updateUserDto.id);
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
