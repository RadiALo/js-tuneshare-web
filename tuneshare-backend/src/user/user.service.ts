import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
