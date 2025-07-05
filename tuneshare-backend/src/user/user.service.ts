import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRegisterRequestDto } from './dto/request/user.register.request.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getUserByEmail(email);
  }

  async registerUser(dto: UserRegisterRequestDto): Promise<User> {
    const existing = await this.getUserByEmail(dto.email);

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
    });

    return user;
  }
}
