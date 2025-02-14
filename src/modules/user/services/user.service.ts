import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { HashService } from './hash.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CriteriaUserDto } from '../dtos/criteria-user.dto';
import { ConfigService } from '@nestjs/config';
import { FileService } from '../../file/services/file.service';
import { FileEntity } from '../../file/entities/file.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
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

  async findByIdDetail(id: number): Promise<UserEntity> {
    await this.throwExceptionIfNotExistById(id);
    return this.userRepository.findByIdDetail(id);
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

  async uploadAvatar(
    avatarFile: Express.Multer.File,
    userId: number,
  ): Promise<UserEntity> {
    let userEntity: UserEntity = await this.findById(userId);
    const fileIdForDelete: number = userEntity.avatarId;
    userEntity.avatar = await this.fileService.create(avatarFile);
    userEntity = await this.updateAvatar(userEntity.id, userEntity.avatar);
    if (fileIdForDelete) {
      await this.fileService.deleteById(fileIdForDelete);
    }
    return userEntity;
  }

  private async updateAvatar(
    userId: number,
    avatar: FileEntity,
  ): Promise<UserEntity> {
    return await this.userRepository.updateAvatar(userId, avatar);
  }

  async subscribe(userId: number, subscriberId: number): Promise<UserEntity> {
    const subscriberEntity: UserEntity =
      await this.findByIdDetail(subscriberId);
    const userEntity: UserEntity = await this.findByIdDetail(userId);
    if (
      subscriberEntity?.subscriptions?.find(
        (subscription: UserEntity): boolean =>
          subscription.id === userEntity.id,
      )
    ) {
      throw new ConflictException(
        'The user is already subscribed to this user',
      );
    }
    if (subscriberEntity?.subscriptions) {
      subscriberEntity.subscriptions.push(userEntity);
    } else {
      subscriberEntity.subscriptions = [userEntity];
    }
    return await this.userRepository.updateSubscriptions(
      subscriberEntity.id,
      subscriberEntity.subscriptions,
    );
  }

  async unsubscribe(userId: number, subscriberId: number): Promise<UserEntity> {
    const subscriberEntity: UserEntity =
      await this.findByIdDetail(subscriberId);
    const userEntity: UserEntity = await this.findByIdDetail(userId);
    if (
      !subscriberEntity?.subscriptions?.find(
        (subscription: UserEntity): boolean =>
          subscription.id === userEntity.id,
      )
    ) {
      throw new NotFoundException('The user is not subscribed to this user');
    }
    subscriberEntity.subscriptions = subscriberEntity.subscriptions.filter(
      (subscription: UserEntity): boolean => subscription.id !== userEntity.id,
    );
    return await this.userRepository.updateSubscriptions(
      subscriberEntity.id,
      subscriberEntity.subscriptions,
    );
  }
}
