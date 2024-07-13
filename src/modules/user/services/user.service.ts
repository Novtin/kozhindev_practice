import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { UpdateDto } from '../dto/update.dto';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async create(createDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createDto);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmail(email);
  }

  async findByNickname(nickname: string): Promise<UserEntity> {
    return this.userRepository.findByNickname(nickname);
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.existByEmail(email);
  }

  async existById(id: number): Promise<boolean> {
    return this.userRepository.existById(id);
  }

  async existByNickname(nickname: string): Promise<boolean> {
    return this.userRepository.existByNickname(nickname);
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async update(updateDto: UpdateDto): Promise<UserEntity> {
    if (updateDto.passwordHash) {
      updateDto.passwordHash = await this.hashService.makeHash(
        updateDto.passwordHash,
      );
    }
    return this.userRepository.update(updateDto);
  }

  async deleteById(id: number): Promise<void> {
    return this.userRepository.deleteById(id);
  }
}
