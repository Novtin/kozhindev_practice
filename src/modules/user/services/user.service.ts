import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { CreateDto } from '../dto/create.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createDto: CreateDto): Promise<UserEntity> {
    return this.userRepository.create(createDto);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneByEmail(email);
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.existByEmail(email);
  }

  async existByNickname(nickname: string): Promise<boolean> {
    return this.userRepository.existByNickname(nickname);
  }
}
