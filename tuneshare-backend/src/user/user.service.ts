import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRegisterDto } from './dto/user.register.dto';
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

  async registerUser(dto: UserRegisterDto) {
    const existing = await this.getUserByEmail(dto.email);

    if (existing) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
    });

    return user;
  }
}
