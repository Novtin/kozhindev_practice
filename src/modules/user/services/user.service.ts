import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CriteriaUserDto } from '../dtos/criteria-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  async create(createDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(createDto);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    await this.throwExceptionIfNotExistByEmail(email);
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
    await this.throwExceptionIfNotExistById(id);
    return this.userRepository.findById(id);
  }

  async findByCriteria(
    criteriaUserDto: CriteriaUserDto,
  ): Promise<UserEntity[]> {
    const {
      query,
      page = 0,
      limit = this.configService.get('pagination.defaultLimit'),
    } = criteriaUserDto;
    return await this.userRepository.findByCriteria(query, limit, page * limit);
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.throwExceptionIfNotExistById(updateUserDto.id);
    if (updateUserDto.passwordHash) {
      updateUserDto.passwordHash = await this.hashService.makeHash(
        updateUserDto.passwordHash,
      );
    }
    return this.userRepository.update(updateUserDto);
  }

  async deleteById(id: number): Promise<void> {
    await this.throwExceptionIfNotExistById(id);
    return this.userRepository.deleteById(id);
  }

  async throwExceptionIfNotExistById(id: number): Promise<void> {
    if (!(await this.existById(id))) {
      throw new NotFoundException();
    }
  }

  async throwExceptionIfNotExistByEmail(email: string): Promise<void> {
    if (!(await this.existByEmail(email))) {
      throw new NotFoundException();
    }
  }
}
