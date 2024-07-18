import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { FindAllUserDto } from '../dtos/find-all-user.dto';
import { ConfigService } from '@nestjs/config';
import { Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  private readonly LENGTH_ARRAY_FIRST_NAME_AND_SURNAME: number = 2;
  private readonly LENGTH_ARRAY_NICKNAME: number = 1;

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

  async findAll(findAllUserDto: FindAllUserDto): Promise<UserEntity[]> {
    const {
      query,
      page = this.configService.get('pagination.defaultPage'),
      limit = this.configService.get('pagination.defaultLimit'),
    } = findAllUserDto;
    const querySplit: string[] = query?.trim()?.split(' ');
    let where: any = {};
    if (querySplit?.length == this.LENGTH_ARRAY_FIRST_NAME_AND_SURNAME) {
      where = {
        firstName: querySplit[0],
        surname: querySplit[1],
      };
    } else if (querySplit?.length == this.LENGTH_ARRAY_NICKNAME) {
      where = {
        nickname: querySplit[0],
      };
    }

    return await this.userRepository.findAll(where, limit, (page - 1) * limit);
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
