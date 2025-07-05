import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type RegisterUserData = {
  email: string;
  password: string;
}

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async createUser({ email, password }: RegisterUserData) {
    return await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}