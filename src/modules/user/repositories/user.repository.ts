import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

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

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsBy({ email });
  }

  async existByNickname(nickname: string): Promise<boolean> {
    return this.userRepository.existsBy({ nickname });
  }
}
